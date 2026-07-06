// =============================
// Profilio Dashboard
// =============================
const theme = localStorage.getItem("theme");

if(theme==="dark"){

document.body.style.background="#111827";

}

const API = "http://localhost:5000/api";

// -----------------------------
// Elements
// -----------------------------

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");
const overlay = document.getElementById("overlay");

const helloName = document.getElementById("helloName");

const fullName = document.getElementById("fullName");
const bio = document.getElementById("bio");

const website1 = document.getElementById("website1");
const website2 = document.getElementById("website2");

const instagram = document.getElementById("instagram");
const linkedin = document.getElementById("linkedin");
const github = document.getElementById("github");
const youtube = document.getElementById("youtube");
const reddit = document.getElementById("reddit");

const profileImage = document.getElementById("profileImage");
const profilePreview = document.getElementById("profilePreview");

const saveBtn = document.getElementById("save");
const publishBtn = document.getElementById("publish");
const previewBtn = document.getElementById("preview");
const logoutBtn = document.getElementById("logout");
const settingsBtn = document.getElementById("settings");

const username = localStorage.getItem("username");

// -----------------------------
// Login Check
// -----------------------------

if (!username) {
    window.location.href = "login.html";
}

// -----------------------------
// Sidebar
// -----------------------------

menuBtn.onclick = () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
};

closeSidebar.onclick = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
};

overlay.onclick = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
};

// -----------------------------
// Image Preview
// -----------------------------

profileImage.onchange = () => {

    if (!profileImage.files.length) return;

    profilePreview.src = URL.createObjectURL(profileImage.files[0]);

};

// -----------------------------
// Load Profile
// -----------------------------

async function loadProfile() {

    try {

        const res = await fetch(`${API}/profile/${username}`);

        const data = await res.json();

        if (!data.success) return;

        const p = data.profile;

        helloName.innerText = p.name || username;

        fullName.value = p.name || "";

        bio.value = p.bio || "";

        website1.value = p.website1 || "";

        website2.value = p.website2 || "";

        instagram.value = p.instagram || "";

        linkedin.value = p.linkedin || "";

        github.value = p.github || "";

        youtube.value = p.youtube || "";

        reddit.value = p.reddit || "";

        if (p.profileImage) {

            profilePreview.src =
                "http://localhost:5000" + p.profileImage;

        }

    }

    catch (e) {

        console.log(e);

    }

}

loadProfile();

// -----------------------------
// Save
// -----------------------------

saveBtn.onclick = async () => {

    const form = new FormData();

    form.append("username", username);

    form.append("name", fullName.value);

    form.append("bio", bio.value);

    form.append("website1", website1.value);

    form.append("website2", website2.value);

    form.append("instagram", instagram.value);

    form.append("linkedin", linkedin.value);

    form.append("github", github.value);

    form.append("youtube", youtube.value);

    form.append("reddit", reddit.value);

    if (profileImage.files.length > 0) {

        form.append("profileImage", profileImage.files[0]);

    }

    try {

        const res = await fetch(`${API}/profile/save`, {

            method: "POST",

            body: form

        });

        const data = await res.json();

        alert(data.message);

        loadProfile();

    }

    catch {

        alert("Server Error");

    }

};

// -----------------------------
// Preview
// -----------------------------

previewBtn.onclick = () => {

    window.location.href = "preview.html";

};

// -----------------------------
// Publish
// -----------------------------

publishBtn.onclick = () => {

    window.location.href = "publish.html";

};

// -----------------------------
// Settings
// -----------------------------

settingsBtn.onclick = () => {

    window.location.href = "settings.html";

};

// -----------------------------
// Logout
// -----------------------------

logoutBtn.onclick = () => {

    localStorage.clear();

    window.location.href = "login.html";

};