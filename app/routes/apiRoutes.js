
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var friendsList = require("../data/friends");
var app = express();


module.exports = function(app) {
   app.get("/api/friends", function(req, res) {
      return res.json(friendsList);
    });


    app.post("/api/friends", function(req, res) {

      //Json object with results of all matches whose difference is less than 5
      var jsonResult = [];
      //Read the scores of the completed survey
      console.log(Object.keys(req.body))

        var scores;

    if(req.body['scores[]']){
      scores  = req.body['scores[]'];
      console.log("scores from survey data: " + scores);
    }
        else{
          scores = req.body.scores
          console.log("scores from Postman data: " + scores);
        }
      // console.log(req.body.scores[]);
      // console.log(scores[0]);
      //Iterate over "friends" in the list of completed survey results
      for(i = 0; i < friendsList.length; i++){
        //var to compute difference between new survey and stored survey results
        var totalDiff = 0;
        var scoresToCompare = friendsList[i]['scores[]'];
        //Iterate over every answer of the survey
        for(j =0; j<scoresToCompare.length; j++){
          //if x > y then do x - y 
          if(scoresToCompare[j] > scores[j]){
            //console.log("totalDiff: " + totalDiff);
            totalDiff += scoresToCompare[j] - scores[j];
          }
          //else if x < y then do y - x
          else{
            //console.log("totalDiff: " + totalDiff);
            totalDiff += scores[j] - scoresToCompare[j];
          }
        }
        //add matches to jsonResult list
        if(totalDiff <= 5){
          //console.log("totalDiff: " + totalDiff);
          //console.log("Added" + friendsList[i].name + " to matches!");
          jsonResult.push(friendsList[i]);
        }
      }
      //console.log(jsonResult);
      friendsList.push(req.body);
      //This is how we finish post calls **** ask TA's
      res.json(jsonResult[0]); 
  });

}

