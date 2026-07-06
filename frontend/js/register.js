const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", async () => {

    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    const message = document.getElementById("message");

    const response = await fetch("https://profilio-backend-kslj.onrender.com",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            username,
            password

        })

    });

    const data = await response.json();

    message.innerText = data.message;

});