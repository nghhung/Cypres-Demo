var jp = require('jsonpath');
const fs = require('fs');
var mysql = require('mysql');

var content = fs.readFileSync("./Postman/JsonReport/Postman.json")
var jsonContent = JSON.parse(content);

var totalRequest = jp.query(jsonContent,'$..Requests.total')
var totalRequestFailed = jp.query(jsonContent,'$..Requests.failed')
var totalRequestPending = jp.query(jsonContent,'$..Requests.pending')
var totalRequestPassed = 0;
var totalAssertions = jp.query(jsonContent,'$..Assertions.total')
var totalAssertionsFailed = jp.query(jsonContent,'$..Assertions.failed')
var totalAssertionsPending = jp.query(jsonContent,'$..Assertions.pending')
var totalAssertionsPassed = 0;
var collectionName = jp.query(jsonContent,'$..Collection..Name')
var timing = jp.query(jsonContent,'$..responseAverage')

console.log(collectionName,totalRequest ,totalRequestFailed,totalRequestPending,timing);

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "Test",
    port: 3306
  });

  var sql = "INSERT INTO Postman (collectionName, totalRequest, totalRequestFailed, totalRequestPending, timing, date) VALUES ('"+collectionName+"','"+totalRequest+"','"+ totalRequestFailed+"','"+ totalRequestPending+"','"+timing+"', UTC_TIMESTAMP)";
  con.query(sql, function (err, result) {
  if (err) throw err;
      console.log("1 record inserted");
  });

  con.end();
