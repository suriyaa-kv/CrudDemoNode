var con = require('./sqlConn')
var express = require('express')
var app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/addUser', (request, response) => {
    con.connect(function (error) {
        if (error) throw error;
        var RollNo = request.body.RollNo
        var Name = request.body.Name
        var Age = request.body.Age
        var DOB = request.body.DOB
        console.log(RollNo, Name, Age, DOB)
        var sql = "insert into portfolio(RollNo,Name,Age,DOB) values ?"
        var values = [[RollNo, Name, Age, DOB]]
        con.query(sql, [values], function (err, res) {
            if (err) throw err;
            response.send('Successfully inserted')
        })
    })
})

app.listen(3000,function(req,res){
    console.log("Running Server...")
})