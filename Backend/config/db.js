// mysql2 package import करतो
const mysql = require('mysql2');

// DB connection create करतो
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// connection check करतो
db.connect((err) => {
    if (err) {
        console.log("DB Error ❌:", err);
    } else {
        console.log("MySQL Connected ✅");
    }
});

// export करतो
module.exports = db;