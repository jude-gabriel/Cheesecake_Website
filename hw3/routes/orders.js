/*********************************
 * Handles responses for orders
 * 
 * Author: Jude Gabriel
 * Date: February 3, 2022
 ********************************/

var express = require('express');
var router = express.Router();

//Import function to conenct to database
const dbQuery = require('./dbms.js');

//Variable to store the data results
var DATA;


/**
 * Post the user order
 * 
 * Respond with the correct data from the request
 */
router.post('/', function(req, res, next) {
  //Variables to hold number of toppings per month
  var plainCount = 0;
  var cherryCount = 0;
  var chocolateCount = 0;

  //Check if the selected month exists in the database
  dbQuery.dbquery("SELECT 1 FROM ORDERS WHERE MONTH='" + req.body.month + "';", function(err, results) {
    if(results.length == 0){
      DATA = [
        {plain: 0},
        {chocolate: 0}, 
        {cherry: 0}
      ];

      res.json(DATA);
    }

    //If the selected month exists then find all orders from that month
    else{
      dbQuery.dbquery("SELECT * FROM ORDERS WHERE MONTH='" + req.body.month + "';", function(err, results){

        //Iterate through the month and find the total quantity of each topping
        for(var i = 0; i < results.length; i++){
          if(results[i].TOPPING.toLowerCase()  == "plain"){
            plainCount += results[i].QUANTITY;
          }
          else if(results[i].TOPPING.toLowerCase()  == "cherry"){
            cherryCount += results[i].QUANTITY;
          }
          if(results[i].TOPPING.toLowerCase()  == "chocolate"){
            chocolateCount += results[i].QUANTITY;
          }
        }
  
        //Construct the data in JSON format and send to client
        DATA = [
          {plain: plainCount},
          {chocolate: chocolateCount}, 
          {cherry: cherryCount}
        ];
      res.json(DATA);
      });
    }
  });
});
  

module.exports = router;