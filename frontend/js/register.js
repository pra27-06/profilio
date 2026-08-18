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
                    username: username,
                    password: password
                })
            }
        );

        const data = await response.json();

        console.log(data);

        if (data.success) {

            message.innerText = data.message || "Registration successful";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);

        } else {

            message.innerText = data.message || "Registration failed";

        }

    } catch (error) {

        console.error("Registration Error:", error);

        message.innerText = "Unable to connect to server.";

    }

});