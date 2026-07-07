const loginBtn = document.getElementById("loginBtn");


loginBtn.addEventListener("click", async () => {


    const username = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value.trim();



    if (!username || !password) {

        alert("Please fill all fields");

        return;

    }



    try {


        const response = await fetch(

            "https://profilio-backend-kslj.onrender.com/api/auth/login",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify({

                    username,

                    password

                })

            }


        );



        const data = await response.json();



        console.log(data);



        if(data.success){


            localStorage.setItem(
                "token",
                data.token
            );


            localStorage.setItem(
                "username",
                data.username
            );


            window.location.href="dashboard.html";


        }

        else{


            alert(data.message);


        }



    }


    catch(error){


        console.log(error);


        alert("Unable to connect to server.");


    }


});