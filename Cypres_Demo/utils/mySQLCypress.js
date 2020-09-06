const fs = require('fs');
const dir = './cypress/cucumber-json';
const mysql = require('mysql');
const jp = require('jsonpath');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "Test",
    port: 3306
  });

fs.readdir(dir, (err, files) => {
  
  // console.log(files.length);
  for (let index = 0; index < files.length; index++) {
    // console.log(files[index]);
    const content = fs.readFileSync(`./cypress/cucumber-json/${files[index]}`)
    const jsonContent = JSON.parse(content);
    // console.log(jsonContent);
    let steps = jp.query(jsonContent,'$..steps[*]')
    // console.log(steps)

        for (let index = 0; index < steps.length; index++) {
            const stepName = jp.query(steps,'$['+index+'].name')
            console.log(stepName);
            const stepStatus = jp.query(steps,'$['+index+'].result.status') 
            console.log(stepStatus);
            const stepDuration = jp.query(steps,'$['+index+'].result.duration')
            console.log(stepDuration);
            
            var sql = "INSERT INTO Cypress (stepName, stepStatus, stepDuration, time_executed) VALUES ('"+stepName+"','"+ stepStatus+"','"+ stepDuration+"',UTC_TIMESTAMP)";
            con.query(sql, function (err, result) {
            if (err) throw err;
                console.log("1 record inserted");
            });
            
        }
    
  }
  con.end();
});

