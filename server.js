//=======================================================
//Project: Discussion Board -- FULL MEAN -- server.js by JM 5.31.15
//=======================================================

//=======================================================
//requires: path, express, bodyParser
//=======================================================
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
//=======================================================

//=======================================================
//app setup : set server, static file server points to 'client' directory, bodyparser for jsondata
//=======================================================
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client')));
var server = app.listen(7777, function() { console.log("listening on port 7777") });
//=======================================================

//=======================================================
//requires: routes
//=======================================================
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);