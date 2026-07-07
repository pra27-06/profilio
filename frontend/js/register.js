const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", async () => {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {

        
        const response = await fetch("https://profilio-backend-kslj.onrender.com/register",{
            
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    password
                })
            }
        );

        const data = await response.json();

        message.innerText = data.message;

    }
    catch(error){

        console.error(error);
        message.innerText = "Unable to connect to server.";

    }

});