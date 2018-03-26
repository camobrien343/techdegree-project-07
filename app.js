// Dependencies for app and routes
const express = require("express");
const Twit = require("twit");
const app = express();
const routes = require('./routes/index');

// set view engine
app.use("/static", express.static("public"));
app.set("view engine", "pug");

// get the routes
app.use('/', routes);

// create server
app.listen(3000, () => {
console.log("The application is serving on localhost:3000, press ctrl + c to terminate.")
});

module.exports = app;
