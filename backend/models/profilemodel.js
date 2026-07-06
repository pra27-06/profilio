const db = require("../config/database");

// Save Profile
const saveProfile = (data, callback) => {

    const {

        userId,
        name,
        bio,
        profileImage,
        website1,
        website2,
        instagram,
        linkedin,
        github,
        youtube,
        reddit,
        twitter

    } = data;

    // Update Users Table
    db.run(

        `UPDATE users
        SET
        name=?,
        bio=?,
        profileImage=?
        WHERE id=?`,

        [

            name,
            bio,
            profileImage,
            userId

        ],

        function (err) {

            if (err) return callback(err);

            // Check Links Exist

            db.get(

                "SELECT * FROM links WHERE userId=?",

                [userId],

                (err, row) => {

                    if (err) return callback(err);

                    if (row) {

                        db.run(

                            `UPDATE links
                            SET

                            website1=?,
                            website2=?,
                            instagram=?,
                            linkedin=?,
                            github=?,
                            youtube=?,
                            reddit=?,
                            twitter=?

                            WHERE userId=?`,

                            [

                                website1,
                                website2,
                                instagram,
                                linkedin,
                                github,
                                youtube,
                                reddit,
                                twitter,
                                userId

                            ],

                            callback

                        );

                    }

                    else {

                        db.run(

                            `INSERT INTO links(

                                userId,
                                website1,
                                website2,
                                instagram,
                                linkedin,
                                github,
                                youtube,
                                reddit,
                                twitter

                            )

                            VALUES(?,?,?,?,?,?,?,?,?)`,

                            [

                                userId,
                                website1,
                                website2,
                                instagram,
                                linkedin,
                                github,
                                youtube,
                                reddit,
                                twitter

                            ],

                            callback

                        );

                    }

                }

            );

        }

    );

};

// Load Profile

const getProfile = (userId, callback) => {

    db.get(

        `SELECT

        users.id,

        users.username,

        users.name,

        users.bio,

        users.profileImage,

        links.website1,

        links.website2,

        links.instagram,

        links.linkedin,

        links.github,

        links.youtube,

        links.reddit,

        links.twitter

        FROM users

        LEFT JOIN links

        ON users.id=links.userId

        WHERE users.id=?`,

        [userId],

        callback

    );

};

module.exports = {

    saveProfile,

    getProfile

};