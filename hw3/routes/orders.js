/*********************************
 * Handles responses for orders
 * 
 * Author: Jude Gabriel
 * Date: February 3, 2022
 ********************************/

var express = require('express');
var router = express.Router();


//Array of json objects with topping and quantity
data = [
    { 'topping' : 'cherry', 'quantity' : 2 } , 
    { 'topping' : 'plain', 'quantity' : 6 } ,
    { 'topping' : 'chocolate', 'quantity' : 3 }
]


/**
 * Get the user orders. display json info
 * on localhost3000/orders
 */
router.get('/', function(req, res, next) {
    res.json(data);
  });

  
/**
 * Post the user order
 * 
 * Respond with the correct data from the request
 */
router.post('/', function(req, res, next) {
    res.json(data);
  });
  

  module.exports = router;