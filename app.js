var express = require('express')
var app = express()

var con=require('./sqlConn')
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

var adminCrudRoute=require('./routes/adminCrudRoute')
app.use('/admin',adminCrudRoute)

app.listen(7000,()=>{
    console.log("running")
})