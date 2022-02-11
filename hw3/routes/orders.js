/****************************************************
 * Handles responses for posting orders to dropdown
 * 
 * Author: Jude Gabriel
 * Date: February 3, 2022
 ***************************************************/

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
router.post('/', function(req, res, next) 
{
  //Variables to hold number of toppings per month
  var plainCount = 0;
  var cherryCount = 0;
  var chocolateCount = 0;

  dbQuery.dbquery("SELECT * FROM ORDERS WHERE MONTH='" + req.body.month + "';", function(err, results)
  {
    //If the month does not exist in the database return 0 for all toppings
    if(results.length == 0)
    {
      DATA = [
        {plain: 0},
        {chocolate: 0}, 
        {cherry: 0}
      ];
    }

    //If the month exists iterate through the month and find the total quantity of each topping
    else
    {
      for(var i = 0; i < results.length; i++)
      {
        if(results[i].TOPPING.toLowerCase()  == "plain")
        {
          plainCount += results[i].QUANTITY;
        }
        else if(results[i].TOPPING.toLowerCase()  == "cherry")
        {
          cherryCount += results[i].QUANTITY;
        }
        else if(results[i].TOPPING.toLowerCase()  == "chocolate")
        {
          chocolateCount += results[i].QUANTITY;
        }
      }
      DATA = [
        {plain: plainCount},
        {chocolate: chocolateCount}, 
        {cherry: cherryCount}
      ];
    }

    //Send the json topping data back to the client side
    res.json(DATA);
  });
});
  

module.exports = router;