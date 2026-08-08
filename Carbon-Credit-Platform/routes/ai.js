const express = require("express");
const Carbon = require("../models/Carbon");

const router = express.Router();



router.get("/:userId", async(req,res)=>{


try{


const carbonData = await Carbon.find({

userId:req.params.userId

})
.sort({

date:-1

});



if(carbonData.length===0){

return res.json({

message:"No carbon data found"

});

}



const latest = carbonData[0];



let level="Beginner";


if(latest.credits>=500){

level="Earth Guardian 🌍";

}

else if(latest.credits>=250){

level="Green Warrior 🌿";

}

else if(latest.credits>=100){

level="Eco Starter 🌱";

}





let score = 
100 - (latest.emission/10);



if(score<0){

score=0;

}





let suggestions=[];



// Carbon advice

if(latest.emission>1000){


suggestions.push(
"⚠️ Your emissions are high. Reduce unnecessary travel and electricity usage."
);


}

else{


suggestions.push(
"✅ Your carbon footprint is under control."
);


}



// Credit advice

if(latest.credits<250){


suggestions.push(
"🌱 Complete more eco activities to earn carbon credits."
);


}

else{


suggestions.push(
"🏆 Great progress! You are close to the next eco level."
);


}



// Tree advice

if(latest.trees<50){


suggestions.push(
"🌳 Plant more trees to improve your carbon offset."
);


}

else{


suggestions.push(
"🌲 Excellent! Your tree contribution is helping Earth."
);


}




res.json({


emission:latest.emission,


credits:latest.credits,


trees:latest.trees,


score:Math.round(score),


level:level,


suggestions:suggestions


});



}


catch(error){


res.status(500).json({

message:error.message

});


}


});



module.exports=router;