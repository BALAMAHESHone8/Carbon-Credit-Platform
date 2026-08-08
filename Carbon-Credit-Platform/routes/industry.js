const express = require("express");

const router = express.Router();


const industries = [

{
name:"Steel Plant",
emission:820,
status:"High"
},

{
name:"Solar Factory",
emission:210,
status:"Good"
},

{
name:"Textile Unit",
emission:430,
status:"Medium"
}

];



router.get("/",(req,res)=>{

    res.json(industries);

});


module.exports = router;