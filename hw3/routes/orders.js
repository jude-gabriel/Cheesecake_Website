/*********************************
 * Handles responses for orders
 * 
 * Author: Jude Gabriel
 * Date: February 3, 2022
 ********************************/

var express = require('express');

var router = express.Router();


var DATA;

const dbQuery = require('./dbms.js');




//Array of json objects with topping and quantity
// dbQuery.dbquery("Select * FROM ORDERS", function(err, results) {
//   DATA = results;
//   console.log( "HERE \n" + DATA);
// });


/**
 * Get the user orders. display json info
 * on localhost3000/orders
 */
router.get('/', function(req, res, next) {
  console.log(req);

   dbQuery.dbquery("SELECT * FROM ORDERS WHERE MONTH=" + req.body.month, function(err, results){
     DATA = results;
   });
    res.json(DATA);
  });

  
/**
 * Post the user order
 * 
 * Respond with the correct data from the request
 */
router.post('/', function(req, res, next) {
  console.log(req.body.months);
  res.json(req.body.months);
  });
  

  module.exports = router;