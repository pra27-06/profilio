require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

require("./config/database");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");

app.use(cors({
    origin: "https://profilio-frontend.onrender.com",
    credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);

app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => {

    res.send("🚀 Profilio Backend Running");

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {

    console.log(`✅ Server running on port ${PORT}`);

});