// ==========================================
// CARBON NEXUS AI
// WALLET SYSTEM
// ==========================================


// Get saved carbon data

// ==========================================
// LOAD WALLET DATA FROM MONGODB
// ==========================================

const user = JSON.parse(
    localStorage.getItem("user")
);


let credits = 0;

let carbon = 0;

let trees = 0;



async function loadWallet(){


    if(!user){

        console.log("User not logged in");

        return;

    }



    try{


        const response = await fetch(

            `https://carbon-credit-platform-b0nc.onrender.com/api/carbon/history/${user.id}`

        );


        const data = await response.json();



        if(data.length > 0){


            const latest = data[0];


            carbon = latest.emission;

            credits = latest.credits;

            trees = latest.trees;


        }



        updateWallet();


    }


    catch(error){


        console.log(
            "Wallet error:",
            error
        );


    }


}


loadWallet();


// ===============================
// // ===============================
// UPDATE WALLET
// ===============================

function updateWallet(){


    document.getElementById("walletCredits").innerHTML =
    credits;


    document.getElementById("walletCarbon").innerHTML =
    carbon + " kg";


    document.getElementById("walletTrees").innerHTML =
    trees;



    // ===============================
    // ECO LEVEL
    // ===============================

    let level = "Beginner";


    if(credits >= 100){

        level = "Eco Starter 🌱";

    }


    if(credits >= 250){

        level = "Green Warrior 🌿";

    }


    if(credits >= 500){

        level = "Earth Guardian 🌍";

    }


    document.getElementById("ecoLevel").innerHTML =
    level;



    // ===============================
    // REWARD PROGRESS
    // ===============================

    let progress = credits / 5;


    if(progress > 100){

        progress = 100;

    }


    document.getElementById("creditProgress").style.width =
    progress + "%";


    document.getElementById("progressText").innerHTML =
    Math.round(progress) +
    "% towards next level";



    // ===============================
    // REWARD MESSAGE
    // ===============================

    const rewardMessage =
    document.getElementById("rewardMessage");


    if(credits >= 500){

        rewardMessage.innerHTML =
        "🏆 Congratulations! You reached Earth Guardian level.";

    }

    else if(credits >=250){

        rewardMessage.innerHTML =
        "🌿 Great work! Keep reducing emissions.";

    }

    else{

        rewardMessage.innerHTML =
        "🌱 Start sustainable actions to earn more credits.";

    }

}