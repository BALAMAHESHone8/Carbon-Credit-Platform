// ==========================================
// CARBON NEXUS AI
// LEADERBOARD SYSTEM
// ==========================================


// Get logged user

const user = JSON.parse(
    localStorage.getItem("user")
);



// ==========================================
// LEVEL SYSTEM
// ==========================================

function getLevel(credits){

    if(credits >= 500){

        return "Earth Guardian 🌍";

    }


    if(credits >= 250){

        return "Green Warrior 🌿";

    }


    if(credits >= 100){

        return "Eco Starter 🌱";

    }


    return "Beginner";

}



// ==========================================
// LOAD LEADERBOARD DATA
// ==========================================

async function loadLeaderboard(){


try{


const response = await fetch(
    "http://localhost:5000/api/leaderboard"
);


const leaderboard = await response.json();



console.log(
    "Leaderboard:",
    leaderboard
);



// TABLE

const table =
document.getElementById(
    "leaderboardTable"
);



if(table){


table.innerHTML = "";



leaderboard.forEach((item,index)=>{


table.innerHTML += `

<tr>

<td>
${index+1}
</td>

<td>
${item.name}
</td>

<td>
${item.credits}
</td>

<td>
${getLevel(item.credits)}
</td>

</tr>

`;

});


}




// CURRENT USER RANK

if(user){


const currentUser =
leaderboard.find(
item =>
item.email === user.email
);



if(currentUser){


const rank =
leaderboard.indexOf(currentUser)+1;



document.getElementById(
"currentRank"
).innerHTML =
"#"+rank;



document.getElementById(
"rankCredits"
).innerHTML =
currentUser.credits;



document.getElementById(
"rankLevel"
).innerHTML =
getLevel(
currentUser.credits
);


}



}



}


catch(error){

console.log(
"Leaderboard Error:",
error
);


}


}




// ==========================================
// LOAD CARBON CHAMPIONS
// ==========================================


async function loadChampions(){


try{


const response = await fetch(

"http://localhost:5000/api/leaderboard"

);



const leaderboard =
await response.json();



const container =
document.getElementById(
"championContainer"
);



if(container){


container.innerHTML = "";



leaderboard.slice(0,3)
.forEach((item,index)=>{


let medal;

let style;



if(index===0){

medal="🥇";
style="gold";

}

else if(index===1){

medal="🥈";
style="silver";

}

else{

medal="🥉";
style="bronze";

}



container.innerHTML += `

<div class="champion-card ${style}">


<div class="rank">

${medal}

</div>


<h2>

${item.name}

</h2>


<p>

${getLevel(item.credits)}

</p>


<h3>

${item.credits} Credits

</h3>


</div>

`;



});


}


}


catch(error){


console.log(
"Champion Error:",
error
);


}


}




// ==========================================
// START
// ==========================================

loadLeaderboard();

loadChampions();