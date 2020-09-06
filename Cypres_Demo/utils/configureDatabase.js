var mysql = require('mysql');

// Please configure the MySQL Credentials here. By deafult, root/<NO_PASSWORD> is configured.
var hostName = "localhost";
var db_username = "root"
var db_password = "12345678"
var db_name = "Test"
var db_tbl_Cypress = "Cypress"
var db_tbl_Postman = "Postman"

var con = mysql.createConnection({
  host: hostName,
  user: db_username,
  password: db_password
});

  con.query("CREATE DATABASE "+db_name, function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });

    var sql = "CREATE TABLE "+db_name+"."+db_tbl_Cypress+" (stepName VARCHAR(255) NOT NULL, stepStatus VARCHAR(255) NOT NULL, stepDuration bigint NOT NULL, time_executed datetime NOT NULL)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });

    var sql = "CREATE TABLE "+db_name+"."+db_tbl_Postman+" (collectionName VARCHAR(255) NOT NULL, totalRequest int NOT NULL, totalRequestFailed int NOT NULL, totalRequestPending int NOT NULL, timing int NOT NULL, date datetime NOT NULL)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });

con.end();