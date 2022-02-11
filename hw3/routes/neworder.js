/*********************************
 * Send a new order to the database
 * 
 * Author: Jude Gabriel
 * Date: February 10, 2022
 ********************************/

 var express = require('express');
const { makeArray } = require('jquery');
 var router = express.Router();


//Import function to conenct to database
const dbQuery = require('./dbms.js');


/**
 * Respond to the post, make a new entry for a new order
 */
router.post('/', function(req, res, next) {
    //Get the passed in data
    var quantity = req.body.quantity;
    var topping = req.body.topping;
    var notes = req.body.notes;
    var month = generateMonth();
    var day = generateDay();
    var orderid;

    //Find the ID of the latest entry to get the ID of the next
    dbQuery.dbquery("SELECT * FROM ORDERS ORDER BY ORDERID DESC LIMIT 1;", function(err, results){
        orderid = results[0].ORDERID + 1;

        //Insert the new order into the database
        dbQuery.dbquery("INSERT INTO ORDERS VALUES(" + orderid + ", '" + month + "', " + day + ", " + quantity 
                                + ", '" + topping + "', '" + notes + "');", function(err, feedback){
                                });
    });
});


//Generate a random month and return 3-char representation
function generateMonth(){
    var month = Math.floor(Math.random() * (13 - 1) + 1);

    switch (month){
        case 1: 
            return "JAN";
        case 2: 
            return "FEB";
        case 3: 
            return "MAR";
        case 4:
            return "APR";
        case 5:
            return "MAY";
        case 6: 
            return "JUN";
        case 7: 
            return "JUL";
        case 8: 
            return "AUG";
        case 9:
            return "SEP";
        case 10:
            return "OCT";
        case 11:
            return "NOV";
        case 12:
            return "DEC";
        default:
            return "DEC";
    }
}


//Generate a random day
function generateDay(){
    return Math.floor(Math.random() * (29 - 1) + 1)
}

module.exports = router;