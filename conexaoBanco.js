var mysql = require("mysql")

var conectBanco = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"escola"
});

module.exports = conectBanco;