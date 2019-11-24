const mysql = require('mysql')
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "samplemydb"
});

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query('create DATABASE samplemydb', function (err, ressult) {
//         if (err) throw error;
//         console.log("Created")
//     })
// });

// con.connect(function (err) {
//     if (err) throw err;
//     var sql = "CREATE TABLE portfolio (RollNo INT, Name VARCHAR(20),Age INT, DOB DATE)"
//     con.query(sql, function (err, res) {
//         if (err) throw err;
//         console.log("Table Cretaed")
//     })
// })

module.exports = con;