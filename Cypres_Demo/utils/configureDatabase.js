var mysql = require('mysql');

// Please configure the MySQL Credentials here. By deafult, root/<NO_PASSWORD> is configured.
var hostName = "localhost";
var db_username = "root"
var db_password = "12345678"
var db_name = "Test"
var db_tbl_name = "Cypress"

var con = mysql.createConnection({
  host: hostName,
  user: db_username,
  password: db_password
});

  con.query("CREATE DATABASE "+db_name, function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });

    var sql = "CREATE TABLE "+db_name+"."+db_tbl_name+" (stepName VARCHAR(255) NOT NULL, stepStatus VARCHAR(255) NOT NULL, stepDuration bigint NOT NULL, time_executed datetime NOT NULL)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });

con.end();