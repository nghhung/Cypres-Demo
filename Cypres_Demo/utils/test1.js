var jp = require('jsonpath');
const fs = require('fs');
var mysql = require('mysql');

var content = fs.readFileSync("./Test/newman/summary-2020-08-13-05-19-17-586-0.json")
var jsonContent = JSON.parse(content);

// var a = {
//     "Collection": {
//         "Info": {
//             "Name": "Hello World",
//             "Id": "3644c6f9-ff96-4cc3-88de-697b99bdc951"
//         }
//     },
//     "Run": {
//         "Stats": {
//             "Requests": {
//                 "total": 1,
//                 "pending": 0,
//                 "failed": 0
//             },
//             "Assertions": {
//                 "total": 4,
//                 "pending": 0,
//                 "failed": 1
//             }
//         },
//         "Failures": [
//             {
//                 "Parent": {
//                     "Name": "Hello World",
//                     "Id": "3644c6f9-ff96-4cc3-88de-697b99bdc951"
//                 },
//                 "Source": {
//                     "Name": "Hello World",
//                     "Id": "d00c088c-6633-4bf5-9ade-e24977ada801"
//                 },
//                 "Error": {
//                     "Message": "expected 'Hello, World!' to deeply equal 'Hello, 123!'",
//                     "Test": "Ensure valid message"
//                 }
//             }
//         ],
//         "Timings": {
//             "responseAverage": 1088,
//             "responseMin": 1088,
//             "responseMax": 1088,
//             "responseSd": 0,
//             "dnsAverage": 0,
//             "dnsMin": 0,
//             "dnsMax": 0,
//             "dnsSd": 0,
//             "firstByteAverage": 0,
//             "firstByteMin": 0,
//             "firstByteMax": 0,
//             "firstByteSd": 0,
//             "started": 1597294160479,
//             "completed": 1597294161666
//         }
//     }
// }

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

  var sql = "INSERT INTO tbl_Test (collectionName, totalRequest, totalRequestFailed, totalRequestPending, timing, date) VALUES ('"+collectionName+"','"+totalRequest+"','"+ totalRequestFailed+"','"+ totalRequestPending+"','"+timing+"', UTC_TIMESTAMP)";
  con.query(sql, function (err, result) {
  if (err) throw err;
      console.log("1 record inserted");
  });

  con.end();
