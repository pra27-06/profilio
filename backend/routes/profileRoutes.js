const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {

    saveProfile,

    getProfile

} = require("../controllers/profileController");

// Save Profile

router.post(

    "/save",

    upload.single("profileImage"),

    saveProfile

);

// Public Profile

router.get(

    "/:username",

    getProfile

);

module.exports = router;