// ==========================================
// CARBON NEXUS AI DASHBOARD
// ==========================================


// ==========================================
// CARD HOVER ANIMATION
// ==========================================

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px)";

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});


// ==========================================
// AI CARD ANIMATION
// ==========================================

const aiCard = document.querySelector(".ai-card");


if(aiCard){

    setInterval(()=>{


        aiCard.style.boxShadow =
        "0 0 35px rgba(0,208,132,.35)";


        setTimeout(()=>{

            aiCard.style.boxShadow="none";

        },800);


    },3000);

}



// ==========================================
// EARTH GLOW
// ==========================================

const earth = document.querySelector(".dashboard-earth");


if(earth){

    setInterval(()=>{


        earth.style.filter =
        "drop-shadow(0 0 45px #00d084)";


        setTimeout(()=>{


            earth.style.filter =
            "drop-shadow(0 0 25px #00d084)";


        },1200);


    },2500);

}



// ==========================================
// GET LOGGED USER
// ==========================================

const user = JSON.parse(
    localStorage.getItem("user")
);



// ==========================================
// LOAD DASHBOARD CARBON DATA
// ==========================================

async function loadCarbonData(){


    if(!user){

        console.log("User not logged in");

        return;

    }



    try{


        const response = await fetch(

            `http://carbon-credit-platform-b0nc.onrender.com/api/carbon/history/${user.id}`

        );


        const data = await response.json();



        if(data.length > 0){


            const latest = data[0];



            document.getElementById(
                "dashboardCarbon"
            ).innerHTML =
            latest.emission + " kg";



            document.getElementById(
                "dashboardCredits"
            ).innerHTML =
            latest.credits;



            document.getElementById(
                "dashboardTrees"
            ).innerHTML =
            latest.trees;



            let score =
            100 - (latest.emission / 10);



            if(score < 0){

                score = 0;

            }



            document.getElementById(
                "dashboardScore"
            ).innerHTML =
            Math.round(score) + "%";



            console.log(
                "MongoDB Carbon Data:",
                latest
            );


        }


    }


    catch(error){


        console.log(
            "Dashboard Error:",
            error
        );


    }


}



// ==========================================
// DYNAMIC CHARTS FROM MONGODB
// ==========================================

async function loadCharts(){


    if(!user){

        return;

    }



    try{


        const response = await fetch(

            `http://carbon-credit-platform-b0nc.onrender.com/api/carbon/history/${user.id}`

        );



        const history = await response.json();



        if(history.length === 0){

            return;

        }



        // ===============================
        // LINE CHART
        // ===============================


        const lineCtx =
        document.getElementById("lineChart");



        if(lineCtx){


            new Chart(lineCtx, {


                type:"line",


                data:{


                    labels:

                    history.map((item,index)=>{

                        return "Record " + (index+1);

                    }),



                    datasets:[{


                        label:
                        "Carbon Emissions (kg)",



                        data:

                        history.map(item=>{

                            return item.emission;

                        }),



                        borderColor:"#00d084",


                        backgroundColor:
                        "rgba(0,208,132,.15)",


                        fill:true,


                        tension:0.4,


                        borderWidth:3


                    }]


                },


                options:{


                    responsive:true,


                    plugins:{


                        legend:{


                            labels:{


                                color:"#ffffff"


                            }


                        }


                    },


                    scales:{


                        x:{


                            ticks:{


                                color:"#ffffff"


                            }


                        },


                        y:{


                            ticks:{


                                color:"#ffffff"


                            }


                        }


                    }


                }


            });


        }





        // ===============================
        // PIE CHART
        // ===============================


        const pieCtx =
        document.getElementById("pieChart");



        if(pieCtx){


            const latest =
            history[0];



            new Chart(pieCtx,{


                type:"doughnut",


                data:{


                    labels:[

                        "Carbon Used",

                        "Remaining"

                    ],



                    datasets:[{


                        data:[


                            latest.emission,


                            Math.max(
                                1000-latest.emission,
                                0
                            )


                        ],



                        backgroundColor:[


                            "#00d084",

                            "#00bfff"


                        ]



                    }]


                },


                options:{


                    responsive:true,


                    plugins:{


                        legend:{


                            position:"bottom",


                            labels:{


                                color:"#ffffff"


                            }


                        }


                    }


                }


            });


        }



    }


    catch(error){


        console.log(
            "Chart Error:",
            error
        );


    }


}



// ==========================================
// START DASHBOARD
// ==========================================

loadCarbonData();

loadCharts();
// =================================
// LOAD LEADERBOARD PREVIEW
// =================================


async function loadLeaderboardPreview(){


try{


const response = await fetch(
    "http://carbon-credit-platform-b0nc.onrender.com/api/leaderboard"
);


const users = await response.json();



const box =
document.getElementById(
    "leaderboardPreview"
);



if(box){


box.innerHTML = "";



users.slice(0,3).forEach((user,index)=>{


let medal = "";


if(index===0)
medal="🥇";

else if(index===1)
medal="🥈";

else if(index===2)
medal="🥉";



box.innerHTML += `

<div class="leader">

<span>
${medal} ${user.name}
</span>


<span>
${user.credits} Credits
</span>

</div>

`;



});


}


}

catch(error){

console.log(
"Leaderboard Error:",
error
);

}


}



loadLeaderboardPreview();
// ==========================================
// LOAD INDUSTRY DATA
// ==========================================


async function loadIndustryData(){


try{


const response = await fetch(

"http://carbon-credit-platform-b0nc.onrender.com/api/industry"

);


const industries =
await response.json();



const table =
document.getElementById(
"industryTable"
);



if(table){


table.innerHTML="";



industries.forEach(item=>{


let statusClass="";


if(item.status==="High"){

statusClass="danger";

}

else if(item.status==="Good"){

statusClass="good";

}

else{

statusClass="medium";

}



table.innerHTML += `


<tr>


<td>

${item.name}

</td>



<td>

${item.emission} kg CO₂

</td>



<td>

<span class="${statusClass}">

${item.status}

</span>

</td>


</tr>


`;



});


}



}

catch(error){


console.log(
"Industry Error:",
error
);


}


}


loadIndustryData();