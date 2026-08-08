// ==========================================
// CARBON NEXUS AI
// AI ASSISTANT SYSTEM
// ==========================================


// Chat elements

const chatBox = document.getElementById("chatBox");

const userInput = document.getElementById("userMessage");

// ===============================
// LOAD USER CARBON DATA
// ===============================

const userCarbonData = JSON.parse(
    localStorage.getItem("carbonData")
);


let userEmission = 0;

let userCredits = 0;

let userTrees = 0;


if(userCarbonData){

    userEmission = userCarbonData.emission;

    userCredits = userCarbonData.credits;

    userTrees = userCarbonData.trees;

}

// ===============================
// SEND MESSAGE
// ===============================


function sendMessage(){


    const message = userInput.value.trim();


    if(message === ""){

        return;

    }


    addMessage(message,"user-message");


    userInput.value="";


    setTimeout(()=>{


        const reply = getAIResponse(message);


        addMessage(reply,"ai-message");


    },700);


}



// ===============================
// ADD MESSAGE
// ===============================


function addMessage(text,className){


    const div=document.createElement("div");


    div.className="message "+className;


    div.innerHTML=text;


    chatBox.appendChild(div);


    chatBox.scrollTop=chatBox.scrollHeight;


}



// ===============================
// QUICK QUESTIONS
// ===============================


function quickAsk(question){


    userInput.value=question;


    sendMessage();


}



// ===============================
// AI RESPONSE ENGINE
// ===============================


function getAIResponse(message){


    message = message.toLowerCase();

// ===============================
// PERSONAL CARBON ANALYSIS
// ===============================

if(message.includes("my carbon") ||
   message.includes("my footprint") ||
   message.includes("my emission")){


    if(userCarbonData){


        return `🌍 Your Carbon Analysis:

        <br><br>

        CO₂ Emission:
        <strong>${userEmission} kg</strong>

        <br><br>

        Carbon Credits:
        <strong>${userCredits}</strong>

        <br><br>

        Trees Supported:
        <strong>${userTrees}</strong>

        <br><br>

        🤖 Recommendation:
        Reduce fuel usage and electricity consumption
        to improve your sustainability score.`;

    }


    else{

        return `🌱 Please calculate your carbon footprint
        first using the Carbon Calculator.`;

    }

}

    if(message.includes("reduce") &&
       message.includes("carbon")){


        return `🌱 You can reduce carbon emissions by:

        <br><br>
        ✅ Use public transport<br>
        ✅ Save electricity<br>
        ✅ Switch to renewable energy<br>
        ✅ Plant more trees<br>
        ✅ Reduce waste`;

    }



    if(message.includes("tree") ||
       message.includes("offset")){


        return `🌳 One mature tree can absorb around
        20-25 kg CO₂ per year.

        <br><br>
        Planting trees combined with reducing
        emissions creates the best impact.`;

    }



    if(message.includes("habit") ||
       message.includes("tip")){


        return `💚 Sustainable habits:

        <br><br>
        🌞 Use solar energy<br>
        🚲 Walk or cycle short distances<br>
        💡 Use LED lights<br>
        ♻ Recycle waste<br>
        🌱 Support green products`;

    }



    if(message.includes("credit")){


        return `🌿 Carbon credits represent verified
        emission reductions.

        <br><br>
        Reducing your footprint helps you earn
        more carbon credits in Carbon Nexus AI.`;

    }



    if(message.includes("hello") ||
       message.includes("hi")){


        return `Hello 👋

        I am Carbon AI Assistant.

        Ask me about:
        🌱 Carbon reduction
        🌍 Sustainability
        🌳 Tree offset
        🏆 Carbon credits`;

    }



    return `🤖 I suggest reducing emissions through:

    <br><br>
    • Lower electricity usage<br>
    • Choose renewable energy<br>
    • Reduce fuel consumption<br>
    • Practice recycling

    <br><br>
    Keep making Earth greener 🌍`;

}