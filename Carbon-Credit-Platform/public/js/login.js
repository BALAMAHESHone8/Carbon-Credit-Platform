// ==========================================
// LOGIN SYSTEM
// ==========================================


const loginForm =
document.getElementById("loginForm");



loginForm.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;



try{


const response = await fetch(

"http://localhost:5000/api/auth/login",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

email,

password

})

}

);



const data =
await response.json();



alert(data.message);



if(response.ok){


localStorage.setItem(
"user",
JSON.stringify(data.user)
);


localStorage.setItem(
"token",
data.token
);



window.location.href =
"dashboard.html";


}



}


catch(error){


console.log(
"Login Error:",
error
);


}


});