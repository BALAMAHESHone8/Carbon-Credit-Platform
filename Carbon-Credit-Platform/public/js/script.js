// ===============================
// LOGIN MODAL
// ===============================

const loginModal = document.getElementById("loginModal");

function openLogin(){

    loginModal.style.display="flex";

}

function closeLogin(){

    loginModal.style.display="none";

}

// Close on outside click

window.onclick=function(e){

    if(e.target===loginModal){

        closeLogin();

    }

}

// ===============================
// LOGIN FORM
// ===============================

// ===============================
// LOGIN FORM WITH BACKEND API
// ===============================

const loginForm = document.getElementById("loginForm");


loginForm.addEventListener("submit", async function(e){

    e.preventDefault();


    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;



    try{


        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    email:email,

                    password:password

                })

            }
        );



        const data = await response.json();



        if(response.ok){


            localStorage.setItem(
                "token",
                data.token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            alert("Login Successful 🚀");


            closeLogin();


            window.location.href =
            "dashboard.html";


        }

        else{


            alert(data.message);


        }


    }

    catch(error){


        console.log(error);

        alert("Server connection failed");


    }


});