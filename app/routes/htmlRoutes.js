var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var apis = require("./apiRoutes")
var friendsList = require("../data/friends");


module.exports = function(app) {


	//HTML ROUTES!!
	app.get("/survey", function(req, res) {
  		res.sendFile(path.join(__dirname, "/../public/survey.html"));
	});
	

	app.get("/", function(req, res) {
	  res.sendFile(path.join(__dirname, "/../public/home.html"));

	});
    
  	app.get("/api/friends", function(req, res) {
  		res.json(friendsList)
  	});

  	 app.get("/*", function(req, res) {
  	  res.redirect("/")
  	});
	
}

