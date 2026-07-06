const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// ================= REGISTER =================

const register = async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {

            return res.json({
                success: false,
                message: "Please fill all fields"
            });

        }

        User.findUserByUsername(username, async (err, user) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Database Error"
                });

            }

            if (user) {

                return res.json({
                    success: false,
                    message: "Username already exists"
                });

            }

            const hash = await bcrypt.hash(password, 10);

            User.createUser(username, hash, (err) => {

                if (err) {

                    console.error(err);

                    return res.status(500).json({
                        success: false,
                        message: "Unable to create account"
                    });

                }

                return res.json({
                    success: true,
                    message: "Registration Successful"
                });

            });

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// ================= LOGIN =================

const login = (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {

            return res.json({
                success: false,
                message: "Please fill all fields"
            });

        }

        User.findUserByUsername(username, async (err, user) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Database Error"
                });

            }

            if (!user) {

                return res.json({
                    success: false,
                    message: "User not found"
                });

            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {

                return res.json({
                    success: false,
                    message: "Wrong Password"
                });

            }

            const token = jwt.sign(

                {
                    id: user.id,
                    username: user.username
                },

                process.env.JWT_SECRET || "profilio_secret",

                {
                    expiresIn: "7d"
                }

            );

            return res.json({

                success: true,

                message: "Login Successful",

                token,

                username: user.username

            });

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

module.exports = {

    register,

    login

};