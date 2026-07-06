const db = require("../config/database");

// ==========================
// SAVE PROFILE
// ==========================

const saveProfile = (req, res) => {

    const {

        username,
        name,
        bio,
        instagram,
        linkedin,
        github,
        youtube,
        reddit,
        website1,
        website2

    } = req.body;

    let profileImage = "";

    if (req.file) {

        profileImage = "/uploads/" + req.file.filename;

    }

    db.get(

        "SELECT * FROM users WHERE username=?",

        [username],

        (err, user) => {

            if (err) {

                return res.json({

                    success: false,

                    message: "Database Error"

                });

            }

            if (!user) {

                return res.json({

                    success: false,

                    message: "User Not Found"

                });

            }

            // Keep old image if no new image uploaded

            if (!profileImage) {

                profileImage = user.profileImage;

            }

            db.run(

                `UPDATE users
                 SET
                 name=?,
                 bio=?,
                 profileImage=?
                 WHERE username=?`,

                [

                    name,
                    bio,
                    profileImage,
                    username

                ],

                function (err) {

                    if (err) {

                        return res.json({

                            success: false,

                            message: "Unable to Update"

                        });

                    }

                    db.get(

                        "SELECT * FROM links WHERE userId=?",

                        [user.id],

                        (err, row) => {

                            if (row) {

                                db.run(

                                    `UPDATE links SET

                                    instagram=?,
                                    linkedin=?,
                                    github=?,
                                    youtube=?,
                                    reddit=?,
                                    website1=?,
                                    website2=?

                                    WHERE userId=?`,

                                    [

                                        instagram,
                                        linkedin,
                                        github,
                                        youtube,
                                        reddit,
                                        website1,
                                        website2,
                                        user.id

                                    ],

                                    () => {

                                        return res.json({

                                            success: true,

                                            message: "Profile Updated"

                                        });

                                    }

                                );

                            }

                            else {

                                db.run(

                                    `INSERT INTO links(

                                    userId,
                                    instagram,
                                    linkedin,
                                    github,
                                    youtube,
                                    reddit,
                                    website1,
                                    website2

                                    )

                                    VALUES(?,?,?,?,?,?,?,?)`,

                                    [

                                        user.id,
                                        instagram,
                                        linkedin,
                                        github,
                                        youtube,
                                        reddit,
                                        website1,
                                        website2

                                    ],

                                    () => {

                                        return res.json({

                                            success: true,

                                            message: "Profile Saved"

                                        });

                                    }

                                );

                            }

                        }

                    );

                }

            );

        }

    );

};

// ==========================
// GET PROFILE
// ==========================

const getProfile = (req, res) => {

    const username = req.params.username;

    db.get(

        `SELECT

        users.username,
        users.name,
        users.bio,
        users.profileImage,

        links.instagram,
        links.linkedin,
        links.github,
        links.youtube,
        links.reddit,
        links.website1,
        links.website2

        FROM users

        LEFT JOIN links

        ON users.id=links.userId

        WHERE users.username=?`,

        [username],

        (err, row) => {

            if (err) {

                return res.json({

                    success:false,

                    message:"Database Error"

                });

            }

            if(!row){

                return res.json({

                    success:false,

                    message:"Profile Not Found"

                });

            }

            return res.json({

                success:true,

                profile:row

            });

        }

    );

};

module.exports={

    saveProfile,

    getProfile

};