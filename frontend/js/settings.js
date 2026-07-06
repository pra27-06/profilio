const lightBtn = document.getElementById("lightBtn");

const darkBtn = document.getElementById("darkBtn");

const back = document.getElementById("back");

lightBtn.onclick = () => {

    localStorage.setItem("theme", "light");

    alert("✅ Light Mode Enabled");

};

darkBtn.onclick = () => {

    localStorage.setItem("theme", "dark");

    alert("✅ Dark Mode Enabled");

};

back.onclick = () => {

    window.location.href = "dashboard.html";

};

// Apply Theme

const theme = localStorage.getItem("theme");

if (theme === "dark") {

    document.body.style.background = "#111827";

}

if (theme === "light") {

    document.body.style.background = "linear-gradient(135deg,#6C3BFF,#A855F7)";

}