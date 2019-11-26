const mysql = require('mysql')
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "samplemydb"
});

exports.addUser=function(request, response) {
    console.log(request.body)
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
}


exports.getAllUser=((request, response) => {
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


exports.alterUser=function (request, response) {
    con.connect(function (err) {
        if (err) throw err;
        var RollNo = request.body.RollNo
        var newName = request.body.newName
        console.log(RollNo,newName)
        var sql = `Select * from portfolio where RollNo=${RollNo}`
        var UpdateSql=`Update portfolio set name='${newName}' where RollNo=${RollNo}`

        con.query(sql, function (err, fetchRes) {
            if (err) throw err;
            console.log(fetchRes)
            console.log(typeof (fetchRes))
            if (Object.keys(fetchRes).length == 0) {
                response.send("No records Found")
            }
            else {
                con.query(UpdateSql, function (err, Deleteres) {
                    if (err) throw err;
                    response.send("Updated successfully")
                })
            }
        })
    })
}

// exports.deleteUser=function (request, response) {
//     con.connect(function (err) {
//         if (err) throw err;
//         var RollNo = request.params.RollNo
//         console.log(RollNo)
//         var sql = `Select * from portfolio where RollNo=${RollNo}`
//         var delsql=`Delete from portfolio where RollNo=${RollNo}`

//         con.query(sql, function (err, fetchRes) {
//             if (err) throw err;
//             console.log(fetchRes)
//             console.log(typeof (fetchRes))
//             if (Object.keys(fetchRes).length == 0) {
//                 response.send("No records Found")
//             }
//             else {
//                 con.query(delsql, function (err, Deleteres) {
//                     if (err) throw err;
//                     response.send("Deleted successfully")
//                 })
//             }
//         })
//     })
// }
