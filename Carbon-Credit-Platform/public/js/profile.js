// =================================
// PROFILE SYSTEM
// =================================


const user = JSON.parse(
localStorage.getItem("user")
);



if(user){


document.getElementById(
"profileName"
).innerHTML =
user.name;



document.getElementById(
"profileEmail"
).innerHTML =
user.email;


}



async function loadProfile(){


if(!user)
return;



const response = await fetch(

`http://carbon-credit-platform-b0nc.onrender.com/api/carbon/history/${user.id}`

);



const data =
await response.json();



if(data.length>0){


const latest=data[0];


document.getElementById(
"profileCredits"
).innerHTML =
latest.credits;



document.getElementById(
"profileTrees"
).innerHTML =
latest.trees;



let level="Beginner";


if(latest.credits>=500)

level="Earth Guardian 🌍";


else if(latest.credits>=250)

level="Green Warrior 🌿";


else if(latest.credits>=100)

level="Eco Starter 🌱";



document.getElementById(
"profileLevel"
).innerHTML =
level;


}


}



loadProfile();