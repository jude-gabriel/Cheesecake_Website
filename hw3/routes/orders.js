/*********************************
 * Handles responses for orders
 * 
 * Author: Jude Gabriel
 * Date: February 3, 2022
 ********************************/

var express = require('express');
var router = express.Router();

data = [ 
    { 'topping' : 'cherry', 'quantity' : 2 } , 
    { 'topping' : 'plain', 'quantity' : 6 } ,
    { 'topping' : 'chocolate', 'quantity' : 3 }
]



/* GET user orders */
router.get('/', function(req, res, next) {
    res.json(data);
  });

/* POST user orders */
router.post('/', function(req, res, next) {
    res.json(data);
  });
  
  module.exports = router;