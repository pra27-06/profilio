// =============================
// Profilio Dashboard
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

// =============================
// Elements
// =============================

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

// =============================
// Login Check
// =============================

if (!username) {
    window.location.href = "login.html";
}

// =============================
// Sidebar
// =============================

if (menuBtn) {
    menuBtn.onclick = () => {
        sidebar.classList.add("active");
        overlay.classList.add("active");
    };
}

if (closeSidebar) {
    closeSidebar.onclick = () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    };
}

if (overlay) {
    overlay.onclick = () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    };
}

// =============================
// Image Preview
// =============================

if (profileImage) {

    profileImage.onchange = () => {

        if (!profileImage.files.length) return;

        profilePreview.src = URL.createObjectURL(
            profileImage.files[0]
        );

    };

}

// =============================
// Load Profile
// =============================

async function loadProfile() {

    try {

        const res = await fetch(
            `${API}/profile/${encodeURIComponent(username)}`
        );

        const data = await res.json();

        if (!data.success) {
            console.log(data.message);
            return;
        }

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
                `${API_BASE}${p.profileImage}`;

        }

    }

    catch (error) {

        console.log("Load Profile Error:", error);

    }

}

loadProfile();

// =============================
// SAVE PROFILE
// =============================

if (saveBtn) {

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

        if (
            profileImage &&
            profileImage.files &&
            profileImage.files.length > 0
        ) {

            form.append(
                "profileImage",
                profileImage.files[0]
            );

        }

        try {

            saveBtn.disabled = true;
            saveBtn.innerText = "Saving...";

            const res = await fetch(
                `${API}/profile/save`,
                {
                    method: "POST",
                    body: form
                }
            );

            const data = await res.json();

            if (data.success) {

                alert("✅ Profile saved successfully!");

                await loadProfile();

            }

            else {

                alert(
                    "❌ " +
                    (data.message || "Unable to save profile")
                );

            }

        }

        catch (error) {

            console.log("Save Error:", error);

            alert(
                "❌ Unable to connect to server.\n\n" +
                "Please try again."
            );

        }

        finally {

            saveBtn.disabled = false;
            saveBtn.innerText = "Save";

        }

    };

}

// =============================
// PREVIEW
// =============================

if (previewBtn) {

    previewBtn.onclick = () => {

        window.location.href = "preview.html";

    };

}

// =============================
// PUBLISH
// =============================

if (publishBtn) {

    publishBtn.onclick = () => {

        window.location.href = "publish.html";

    };

}

// =============================
// SETTINGS
// =============================

if (settingsBtn) {

    settingsBtn.onclick = () => {

        window.location.href = "settings.html";

    };

}

// =============================
// LOGOUT
// =============================

if (logoutBtn) {

    logoutBtn.onclick = () => {

        localStorage.clear();

        window.location.href = "login.html";

    };

}