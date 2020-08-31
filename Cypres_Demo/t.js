const fs = require('fs');

var dir = './cypress/cucumber-json'

var a = fs.readdir(dir, (err, files) => {
    console.log(files);
    
})

console.log("test",a);
