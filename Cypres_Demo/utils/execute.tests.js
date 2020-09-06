const npm = require("npm");

// npm.load(() => npm.run("cy:run"));
npm.load(() => npm.run("cy:test"));
npm.load(() => npm.run("run:postman:json"));
npm.load(() => npm.run("run:postman:html"));
npm.load(() => npm.run("save:results:postman"));
npm.load(() => npm.run("save:results:cypress"));