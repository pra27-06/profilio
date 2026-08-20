// =============================
// Profilio Publish
// =============================

const theme = localStorage.getItem("theme");

if (theme === "dark") {
    document.body.style.background = "#111827";
}

// =============================
// DEPLOYED BACKEND
// =============================

const API_BASE = "https://profilobackend.onrender.com";
const API = `${API_BASE}/api`;

const username = localStorage.getItem("username");

if (!username) {
    window.location.href = "login.html";
}

// =============================
// Elements
// =============================

const profilePhoto =
    document.getElementById("profilePhoto");

const name =
    document.getElementById("name");

const bio =
    document.getElementById("bio");

const links =
    document.getElementById("links");

const shareBtn =
    document.getElementById("shareBtn");

// =============================
// Load Published Profile
// =============================

async function publish() {

    try {

        const res = await fetch(
            `${API}/profile/${encodeURIComponent(username)}`
        );

        const data = await res.json();

        if (!data.success) {

            alert(
                data.message ||
                "Profile Missing"
            );

            return;

        }

        const p = data.profile;

        // =============================
        // Profile Image
        // =============================

        if (p.profileImage) {

            profilePhoto.src =
                `${API_BASE}${p.profileImage}`;

        }

        else {

            profilePhoto.src =
                "images/default.png";

        }

        // =============================
        // Name
        // =============================

        name.innerText =
            p.name || username;

        // =============================
        // Bio
        // =============================

        bio.innerText =
            p.bio || "";

        // =============================
        // Links
        // =============================

        links.innerHTML = "";

        addLink("🌐 Website", p.website1);
        addLink("💼 Portfolio", p.website2);
        addLink("📷 Instagram", p.instagram);
        addLink("💼 LinkedIn", p.linkedin);
        addLink("💻 GitHub", p.github);
        addLink("▶ YouTube", p.youtube);
        addLink("👽 Reddit", p.reddit);

        // =============================
        // Share
        // =============================

        if (shareBtn) {

            shareBtn.onclick = async () => {

                try {

                    const url =
                        window.location.href;

                    if (navigator.share) {

                        await navigator.share({

                            title:
                                p.name ||
                                "Profilio Profile",

                            text:
                                p.bio ||
                                "Check out my Profilio profile!",

                            url: url

                        });

                    }

                    else {

                        await navigator.clipboard.writeText(
                            url
                        );

                        alert(
                            "✅ Profile Link Copied"
                        );

                    }

                }

                catch (error) {

                    console.log(
                        "Share Error:",
                        error
                    );

                }

            };

        }

    }

    catch (error) {

        console.log(
            "Publish Error:",
            error
        );

        alert(
            "❌ Unable to connect to server."
        );

    }

}

// =============================
// Add Link
// =============================

function addLink(title, url) {

    if (!url || url.trim() === "") {
        return;
    }

    const a =
        document.createElement("a");

    a.className = "link";

    a.href = url;

    a.target = "_blank";

    let icon = "";

    switch (title) {

        case "🌐 Website":

            icon =
                '<i class="fa-solid fa-globe"></i>';

            break;

        case "💼 Portfolio":

            icon =
                '<i class="fa-solid fa-briefcase"></i>';

            break;

        case "📷 Instagram":

            icon =
                '<i class="fa-brands fa-instagram" style="color:#E1306C;"></i>';

            break;

        case "💼 LinkedIn":

            icon =
                '<i class="fa-brands fa-linkedin" style="color:#0A66C2;"></i>';

            break;

        case "💻 GitHub":

            icon =
                '<i class="fa-brands fa-github"></i>';

            break;

        case "▶ YouTube":

            icon =
                '<i class="fa-brands fa-youtube" style="color:red;"></i>';

            break;

        case "👽 Reddit":

            icon =
                '<i class="fa-brands fa-reddit" style="color:#FF5700;"></i>';

            break;

    }

    a.innerHTML = `
        ${icon}
        <span>${title}</span>
    `;

    // =============================
    // Long Press Copy
    // =============================

    let timer;

    a.addEventListener(
        "mousedown",
        () => {

            timer = setTimeout(
                async () => {

                    try {

                        await navigator.clipboard.writeText(
                            url
                        );

                        alert(
                            "✅ Link Copied"
                        );

                    }

                    catch (error) {

                        console.log(error);

                    }

                },
                1000
            );

        }
    );

    a.addEventListener(
        "mouseup",
        () => {

            clearTimeout(timer);

        }
    );

    a.addEventListener(
        "mouseleave",
        () => {

            clearTimeout(timer);

        }
    );

    links.appendChild(a);

}

// =============================
// Start
// =============================

publish();