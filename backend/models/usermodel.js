const db = require("../config/database");

// ================= CREATE USER =================

const createUser = (username, password, callback) => {

    const sql = `
        INSERT INTO users (username, password)
        VALUES (?, ?)
    `;

    db.run(sql, [username, password], function (err) {

        callback(err);

    });

};

// ================= FIND USER =================

const findUserByUsername = (username, callback) => {

    const sql = `
        SELECT * FROM users
        WHERE username = ?
    `;

    db.get(sql, [username], (err, row) => {

        callback(err, row);

    });

};

// ================= UPDATE BIO =================

const updateBio = (username, bio, callback) => {

    const sql = `
        UPDATE users
        SET bio = ?
        WHERE username = ?
    `;

    db.run(sql, [bio, username], function (err) {

        callback(err);

    });

};

// ================= EXPORT =================

module.exports = {

    createUser,

    findUserByUsername,

    updateBio

};