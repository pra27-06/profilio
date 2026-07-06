const db = require("../config/database");

const saveLinks = (userId, data, callback) => {

    db.run(

        `INSERT INTO links(

            userId,

            instagram,

            linkedin,

            github,

            youtube,

            reddit,

            twitter,

            website1,

            website2

        )

        VALUES(?,?,?,?,?,?,?,?,?)`,

        [

            userId,

            data.instagram,

            data.linkedin,

            data.github,

            data.youtube,

            data.reddit,

            data.twitter,

            data.website1,

            data.website2

        ],

        callback

    );

};

module.exports = {

    saveLinks

};