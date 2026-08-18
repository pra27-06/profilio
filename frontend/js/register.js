const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", async () => {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    if (!username || !password) {

        message.innerText = "Please fill all fields.";

        return;

    }

    try {

        const response = await fetch(
            "https://profiliobackend.onrender.com/api/auth/register",
            {
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

        console.log(data);

        message.innerText = data.message;

        if (data.success) {

            setTimeout(() => {

                window.location.href = "login.html";

            }, 1000);

        }

    }

    catch (error) {

        console.error("Register Error:", error);

        message.innerText = "Unable to connect to server.";

    }

});