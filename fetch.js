const mysql = require('mysql')
var fs = require('fs')
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "employees"
});
var result = fs.createWriteStream('./fetch.txt')
con.connect(function (error) {
    if (error) throw error;
    console.log('COnnection established')


    var query = con.query('SELECT * FROM salaries');
    query
        .on('error', function (err) {
            console.log(err)
        })
        .on('result', function (row) {
            //console.log(typeof(row))
            //result.write(JSON.stringify(row))

            // row.on('data',function(chunk){
            //     console.log(chunk)
            // })
            // var read=fs.createReadStream(JSON.parse(JSON.stringify(row)))
            //console.log(row)
        })
        .on('end', function () {
            console.log("ended")
        });
})

// con.query('SELECT * FROM salaries')
//   .stream({highWaterMark: 5})
//   .pipe(result)

// con.connect(function (error) {
//     if (error) throw error;
//     console.log('COnnection established')

//     //var result = fs.createWriteStream('./fetch.txt')
//     var query = con.query('SELECT * FROM salaries',function(err,res){
//         console.log(JSON.stringify(res))
//     })
// })