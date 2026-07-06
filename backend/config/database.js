const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
    path.join(__dirname, "../database/profilio.db"),
    (err) => {
        if (err) {
            console.log("❌ SQLite Error:", err.message);
        } else {
            console.log("✅ SQLite Connected Successfully");
        }
    }
);

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS users (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            username TEXT UNIQUE NOT NULL,

            password TEXT NOT NULL,

            name TEXT DEFAULT '',

            bio TEXT DEFAULT '',

            profileImage TEXT DEFAULT '',

            theme TEXT DEFAULT 'light',

            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP

        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS links (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            userId INTEGER UNIQUE,

            instagram TEXT DEFAULT '',

            linkedin TEXT DEFAULT '',

            github TEXT DEFAULT '',

            youtube TEXT DEFAULT '',

            reddit TEXT DEFAULT '',

            website1 TEXT DEFAULT '',

            website2 TEXT DEFAULT '',

            FOREIGN KEY(userId) REFERENCES users(id)

        )
    `);

});

module.exports = db;