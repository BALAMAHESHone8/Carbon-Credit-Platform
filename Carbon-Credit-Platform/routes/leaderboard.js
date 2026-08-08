const express = require("express");
const Carbon = require("../models/Carbon");
const User = require("../models/User");

const router = express.Router();


router.get("/", async (req, res) => {

    try {

        const users = await User.find();

        let leaderboard = [];


        for (let user of users) {

            const carbonData = await Carbon.find({
                userId: user._id
            });


            let totalCredits = 0;
            let totalCarbon = 0;


            carbonData.forEach(data => {

                totalCredits += data.credits;
                totalCarbon += data.emission;

            });


            leaderboard.push({

                name: user.name,
                email: user.email,
                credits: totalCredits,
                carbon: totalCarbon

            });


        }


        leaderboard.sort((a,b)=>{

            return b.credits - a.credits;

        });


        res.json(leaderboard);


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

});


module.exports = router;