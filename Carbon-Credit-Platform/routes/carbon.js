const express = require("express");
const Carbon = require("../models/Carbon");

const router = express.Router();


// ===============================
// SAVE CARBON DATA
// ===============================

router.post("/save", async (req, res) => {

    try {

        const {
            userId,
            emission,
            credits,
            trees
        } = req.body;


        const carbon = new Carbon({

            userId,

            emission,

            credits,

            trees

        });


        await carbon.save();


        res.json({

            message: "Carbon data saved successfully",

            data: carbon

        });


    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

});



// ===============================
// GET CARBON HISTORY
// ===============================

router.get("/history/:userId", async(req,res)=>{

    try{


        const history =
        await Carbon.find({

            userId:req.params.userId

        }).sort({

            date:-1

        });



        res.json(history);


    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }


});


module.exports = router;