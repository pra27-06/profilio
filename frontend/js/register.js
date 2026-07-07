const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", async () => {

    const username = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value.trim();

    const message = document.getElementById("message");


    if (!username || !password) {

        message.innerText = "Please fill all fields";
        return;

    }


    try {

        const response = await fetch(
            "https://profilio-backend-kslj.onrender.com/api/auth/register",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    username,
                    password

                })

            });


        const data = await response.json();


        console.log(data);


        message.innerText = data.message;


    }

    catch(error) {

        console.log(error);

        alert("Unable to connect to server.");

    }

});