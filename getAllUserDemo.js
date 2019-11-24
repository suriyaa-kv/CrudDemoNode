var con = require('./sqlConn')
var express = require('express')
var app = express()

app.get('/getAllUser', (request, response) => {
    con.connect(function (err) {
        if (err) throw err;
        var sql = "Select * from portfolio"
        con.query(sql, function (err, res) {
            if (err) throw err;
            if (res == null) {
                response.send("No records")
            } else {
                response.send(res)
            }
        })
    })
})

app.listen(3000,function(req,res){
    console.log("Running Server...")
})