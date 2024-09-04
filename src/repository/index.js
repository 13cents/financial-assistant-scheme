const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./test-db.db", sqlite3.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err.message);
    // Enable foreign key constraints
    db.run("PRAGMA foreign_keys = ON", (err) => {
        if (err) {
            console.error("Failed to enable foreign keys:", err.message);
        }
    });
});


module.exports = {db};

