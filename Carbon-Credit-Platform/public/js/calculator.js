// =========================================
// CARBON NEXUS AI
// Carbon Calculator
// =========================================
console.log("Calculator JS Loaded");
const form = document.getElementById("carbonForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    // =====================
    // GET INPUT VALUES
    // =====================

    const electricity =
        parseFloat(document.getElementById("electricity").value) || 0;

    const petrol =
        parseFloat(document.getElementById("petrol").value) || 0;

    const lpg =
        parseFloat(document.getElementById("lpg").value) || 0;

    const flight =
        parseFloat(document.getElementById("flight").value) || 0;

    const waste =
        parseFloat(document.getElementById("waste").value) || 0;

    // =====================
    // CO₂ FORMULAS
    // =====================

    const electricityCO2 = electricity * 0.82;

    const petrolCO2 = petrol * 2.31;

    const lpgCO2 = lpg * 42.5;

    const flightCO2 = flight * 0.09;

    const wasteCO2 = waste * 0.50;

    const totalCO2 =
        electricityCO2 +
        petrolCO2 +
        lpgCO2 +
        flightCO2 +
        wasteCO2;

    // =====================
    // CARBON CREDITS
    // =====================

    const credits =
        Math.max(0, Math.round(500 - totalCO2));

    // =====================
    // TREES REQUIRED
    // =====================

    const trees =
        Math.ceil(totalCO2 / 21);

    // =====================
    // DISPLAY RESULTS
    // =====================

    document.getElementById("totalCarbon").innerHTML =
        totalCO2.toFixed(2) + " kg";

    document.getElementById("carbonCredits").innerHTML =
        credits;

    document.getElementById("treesRequired").innerHTML =
        trees;
        // ===============================
// SAVE CARBON DATA
// ===============================

const carbonData = {

    emission: totalCO2.toFixed(2),

    credits: credits,

    trees: trees,

    date: new Date().toLocaleDateString()

};


localStorage.setItem(
    "carbonData",
    JSON.stringify(carbonData)
);
// ===============================
// SAVE TO MONGODB
// ===============================

const user =
JSON.parse(localStorage.getItem("user"));


if(user){


fetch("http://carbon-credit-platform-b0nc.onrender.com/api/carbon/save",
{

    method:"POST",

    headers:{

        "Content-Type":"application/json"

    },


    body:JSON.stringify({

        userId:user.id,

        emission:carbonData.emission,

        credits:carbonData.credits,

        trees:carbonData.trees

    })


})
.then(response=>response.json())

.then(data=>{

    console.log(
        "Carbon saved:",
        data
    );

})

.catch(error=>{

    console.log(
        "Save error:",
        error
    );

});


}

    // =====================
    // AI SUGGESTIONS
    // =====================

    let tips = [];

    if(electricity > 250){

        tips.push("⚡ Reduce electricity usage or switch to LED lighting.");

    }

    if(petrol > 40){

        tips.push("🚗 Use public transport or carpool whenever possible.");

    }

    if(lpg > 2){

        tips.push("🔥 Improve cooking efficiency and reduce LPG consumption.");

    }

    if(flight > 500){

        tips.push("✈ Consider trains or virtual meetings for long trips.");

    }

    if(waste > 15){

        tips.push("♻ Separate recyclable waste and compost organic waste.");

    }

    if(tips.length === 0){

        tips.push("🌱 Excellent! Your carbon footprint is under control.");

        tips.push("🏆 Keep following sustainable practices.");

    }

    const list =
        document.getElementById("aiSuggestions");

    list.innerHTML = "";

    tips.forEach(function(tip){

        const li = document.createElement("li");

        li.innerHTML = tip;

        list.appendChild(li);

    });

});
// ===============================
// PDF REPORT
// ===============================

const downloadBtn = document.getElementById("downloadReport");

downloadBtn.addEventListener("click", function(){

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Carbon Nexus AI",20,20);

    doc.setFontSize(16);
    doc.text("Carbon Footprint Report",20,35);

    doc.setFontSize(12);

    doc.text("Total CO₂ : " + document.getElementById("totalCarbon").innerText,20,55);

    doc.text("Carbon Credits : " + document.getElementById("carbonCredits").innerText,20,70);

    doc.text("Trees Required : " + document.getElementById("treesRequired").innerText,20,85);

    doc.text("AI Recommendations",20,105);

    const items=document.querySelectorAll("#aiSuggestions li");

    let y=120;

    items.forEach(item=>{

        doc.text("- "+item.innerText,25,y);

        y+=12;

    });

    doc.save("Carbon_Nexus_AI_Report.pdf");

});