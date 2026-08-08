// ==========================================
// CARBON NEXUS AI ASSISTANT
// ==========================================


// GET LOGGED USER

const user = JSON.parse(
    localStorage.getItem("user")
);



// ==========================================
// LOAD AI ADVICE
// ==========================================

async function loadAIAdvice(){


    if(!user){

        console.log("User not logged in");

        return;

    }



    try{


        const response = await fetch(

            `http://localhost:5000/api/ai/${user.id}`

        );


        const data = await response.json();



        console.log(
            "AI Response:",
            data
        );



        // ===============================
        // UPDATE AI CARDS
        // ===============================


        const emission =
        document.getElementById("aiEmission");


        if(emission){

            emission.innerHTML =
            data.emission + " kg";

        }



        const credits =
        document.getElementById("aiCredits");


        if(credits){

            credits.innerHTML =
            data.credits;

        }



        const level =
        document.getElementById("aiLevel");


        if(level){

            level.innerHTML =
            data.level;

        }



        // ===============================
        // UPDATE SUGGESTIONS
        // ===============================


        const suggestionBox =
        document.getElementById(
            "aiSuggestions"
        );



        if(suggestionBox){


            suggestionBox.innerHTML = "";



            data.suggestions.forEach(item=>{


                suggestionBox.innerHTML += `

                <li>
                    🌱 ${item}
                </li>

                `;


            });


        }



    }


    catch(error){


        console.log(

            "AI Error:",
            error

        );


    }


}



// ==========================================
// START AI ASSISTANT
// ==========================================

loadAIAdvice();