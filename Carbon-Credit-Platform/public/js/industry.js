async function loadIndustries(){


const response = await fetch(
"http://carbon-credit-platform-b0nc.onrender.com/api/industry"
);


const industries =
await response.json();



const box =
document.getElementById(
"industryContainer"
);



industries.forEach(item=>{


box.innerHTML += `

<div class="industry-card">


<h2>
🏭 ${item.name}
</h2>


<h3>
${item.emission} kg CO₂
</h3>


<p>
Status:
${item.status}
</p>


</div>

`;


});


}


loadIndustries();