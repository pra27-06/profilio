const theme = localStorage.getItem("theme");

if(theme==="dark"){

document.body.style.background="#111827";

}
const API = "http://localhost:5000/api";

const username = localStorage.getItem("username");

if (!username) {

    window.location.href = "login.html";

}

const profilePhoto = document.getElementById("profilePhoto");
const name = document.getElementById("name");
const bio = document.getElementById("bio");
const links = document.getElementById("links");
const shareBtn = document.getElementById("shareBtn");

async function publish() {

    try {

        const res = await fetch(`${API}/profile/${username}`);

        const data = await res.json();

        if (!data.success) {

            alert("Profile Missing");

            return;

        }

        const p = data.profile;

        // Profile

        if (p.profileImage) {

            profilePhoto.src =
                "http://localhost:5000" + p.profileImage;

        } else {

            profilePhoto.src = "images/default.png";

        }

        name.innerText = p.name || username;

        bio.innerText = p.bio || "";

        // Links

        links.innerHTML = "";

        addLink("🌐 Website", p.website1);

        addLink("💼 Portfolio", p.website2);

        addLink("📷 Instagram", p.instagram);

        addLink("💼 LinkedIn", p.linkedin);

        addLink("💻 GitHub", p.github);

        addLink("▶ YouTube", p.youtube);

        addLink("👽 Reddit", p.reddit);

        // Share

        const url = window.location.href;

        shareBtn.onclick = async () => {

            try {

                if (navigator.share) {

                    await navigator.share({

                        title: p.name,

                        text: p.bio,

                        url: url

                    });

                }

                else {

                    await navigator.clipboard.writeText(url);

                    alert("✅ Profile Link Copied");

                }

            }

            catch (e) {

                console.log(e);

            }

        };

    }

    catch (err) {

        console.log(err);

    }

}

function addLink(title, url) {

    if (!url || url.trim() === "") return;

    const a = document.createElement("a");

    a.className = "link";

    a.href = url;

    a.target = "_blank";

    let icon = "";

    switch (title) {

        case "🌐 Website":
            icon = '<i class="fa-solid fa-globe"></i>';
            break;

        case "💼 Portfolio":
            icon = '<i class="fa-solid fa-briefcase"></i>';
            break;

        case "📷 Instagram":
            icon = '<i class="fa-brands fa-instagram" style="color:#E1306C;"></i>';
            break;

        case "💼 LinkedIn":
            icon = '<i class="fa-brands fa-linkedin" style="color:#0A66C2;"></i>';
            break;

        case "💻 GitHub":
            icon = '<i class="fa-brands fa-github"></i>';
            break;

        case "▶ YouTube":
            icon = '<i class="fa-brands fa-youtube" style="color:red;"></i>';
            break;

        case "👽 Reddit":
            icon = '<i class="fa-brands fa-reddit" style="color:#FF5700;"></i>';
            break;

    }

    a.innerHTML = `
        ${icon}
        <span>${title}</span>
    `;

    // Long Press = Copy Link

    let timer;

    a.addEventListener("mousedown", () => {

        timer = setTimeout(() => {

            navigator.clipboard.writeText(url);

            alert("✅ Link Copied");

        }, 1000);

    });

    a.addEventListener("mouseup", () => {

        clearTimeout(timer);

    });

    a.addEventListener("mouseleave", () => {

        clearTimeout(timer);

    });

    links.appendChild(a);

}

publish();