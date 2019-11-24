var con = require('./sqlConn')
var express = require('express')
var app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.delete('/delete/:RollNo', function (request, response) {
    con.connect(function (err) {
        if (err) throw err;
        var RollNo = request.params.RollNo
        console.log(RollNo)
        var sql = `Select * from portfolio where RollNo=${RollNo}`
        var delsql=`Delete from portfolio where RollNo=${RollNo}`

        con.query(sql, function (err, fetchRes) {
            if (err) throw err;
            console.log(fetchRes)
            console.log(typeof (fetchRes))
            if (Object.keys(fetchRes).length == 0) {
                response.send("No records Found")
            }
            else {
                con.query(delsql, function (err, Deleteres) {
                    if (err) throw err;
                    response.send("Deleted successfully")
                })
            }
        })
    })
})

app.listen(3000, function (req, res) {
    console.log("Running Server...")
})
