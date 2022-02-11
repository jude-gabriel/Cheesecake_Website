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




  
/**
 * Post the user order
 * 
 * Respond with the correct data from the request
 */
router.post('/', function(req, res, next) {

  

  dbQuery.dbquery("SELECT * FROM ORDERS WHERE MONTH='" + req.body.month + "';", function(err, results){

     for(int i = 0; i < results.length)
    res.json(results);
   });
  
  });
  

  module.exports = router;