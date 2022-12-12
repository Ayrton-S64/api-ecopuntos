const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    // password: "1234",
    password: "",
    database: "ecopuntos"
});

conn.connect();

module.exports = conn;