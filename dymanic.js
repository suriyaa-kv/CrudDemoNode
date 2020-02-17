const mysql = require('mysql')
var fs = require('fs')
const fastcsv = require("fast-csv");
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "employees"
});
const ws = fs.createWriteStream("dynamic_mysql_fastcsv.csv");
function buildConditions(params) {
    var conditions = [];
    var values = [];
    var columns = [];
    var conditionsStr;
    if (typeof params.emp_no !== 'undefined') {
        columns.push('emp_no');
        conditions.push("emp_no Like ?");
        values.push( params.emp_no);
    }

    if (typeof params.salary !== 'undefined') {
        columns.push('salary');
        conditions.push("salary = ?");
        values.push(parseInt(params.salary));
    }
    if (typeof params.from_date !== 'undefined') {
        columns.push('from_date')
        conditions.push("from_date > ?");
        values.push(params.from_date);
    }

    if (typeof params.to_date !== 'undefined') {
        columns.push('to_date');
        conditions.push("to_date < ?");
        values.push(params.to_date);
    }

    return {
        where: conditions.length ? conditions.join(' AND ') : '1',
        values: values,
        attribues:columns
    };
}

var params = {
    emp_no: undefined,
    salary:undefined,
    from_date: undefined,
    to_date:undefined,

}
var conditions = buildConditions(params);

var sql = 'SELECT '+ conditions.attribues+' FROM salaries WHERE ' + conditions.where;
// con.connect(function (error) {
//     if (error) throw error;
//     console.log('COnnection established')
//     con.query(sql, conditions.values, function (err, results) {
//         console.log(sql)
//         console.log(results)
//     });
// })

con.connect(error => {
    if (error) throw error;
  
    // query data from MySQL
    con.query(sql,conditions.values, function(error, data, fields) {
      if (error) throw error;
  
      const jsonData = JSON.parse(JSON.stringify(data));
      console.log("jsonData", jsonData);
  
      fastcsv
        .write(jsonData, { headers: true })
        .on("finish", function() {
          console.log("Write to bezkoder_mysql_fastcsv.csv successfully!");
        })
        .pipe(ws);
    });
  });