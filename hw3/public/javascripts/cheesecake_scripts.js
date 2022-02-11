/******************************************************************************
 * Scripts for the Cheesecake Website
 * 
 * ALlows a user to place an order and change the month in the 
 * dropdown menu
 * 
 * Author: Jude Gabriel
 * Date: January 25, 2022
 * Updated: February 3, 2022
 ******************************************************************************/


//Global variable tells us if the cheesecake vegan warning has been 
//appended to the page
var isAppended = false;


/**
 * Event Handler for when the document is ready
 * 
 * Allows scripts to be called
 */
documentReady = function()
{
    //Call the event handler for when the month drop down was clicked
    $(".dropdown-content a").click(monthHandler);
 
    //Call the event handler for when the order button was clicked
    $("#order").click(orderHandler);
}
 
 
 /**
  * Called when the document is ready. Allows scripts to be ran 
  * only if page is loaded. 
  */
 $(function()
 {
     $(document).ready(documentReady);
 });


/**
 * Event Handler for the change in the month 
 * 
 * Allows a user to select a month from the drop down list
 */
monthHandler = function()
{
    //Find which month was clicked and replace the current month with it
    var month =  $(this).text();
    $("#dropdown").empty();
    $("#dropdown").append(month);

    

    //Request the JSON data, popoulate the bulleted list 
    //with the corresponding quantity and topping
    $.post("/orders", {month : month}, function(req, res, next){
        $('#l1').empty();
        $('#l1').append(req[0].plain + " Plain");
        $('#l2').empty();
        $('#l2').append(req[1].chocolate + " Chocolate");
        $('#l3').empty();
        $('#l3').append(req[2].cherry + " Cherry");
    });
}


/**
 * Event Handler for the order button
 * 
 * Removes the "Quantity Topping" section. Replaces it with 
 * text containing order details as well as custormer notes
 */
orderHandler = function()
{
     //Get the user's input and cast to lowercase 
     var userInput = $("#notes").val();
     if(userInput == null){
         userInput = " ";
     }
     var isVegan = userInput.toLowerCase();

     //Get toppoing and quantity
     var topping;
     var quantity

     //Check if the user's input contains the word vegan
     //and display error message onece
     if(isVegan.includes("vegan"))
     {
         alert("Cheesecake contains dairy!");
         if(isAppended == false)
         {
             $(".notes-area").after("Cheesecake contains dairy!");
             isAppended = true;
         }
         
     }
     else
     {
         //Get the topping selected. If none are selected default to plain
         if(document.getElementById("chocolate").checked == true)
         {
             topping = "Chocolate";
         }
         else if(document.getElementById("cherry").checked == true)
         {
             topping = "Cherry";
         }
         else
         {
             topping = "Plain"
         }

         //Get the quantity of the topping 
         quantity = document.getElementById("quantity").value;

         //Clear the user form, display thank you and order details
         $("#userform").empty();
         $("#userform").append("Thank you! Your order has been placed.<br><br>");
         $("#userform").append("Order Details:<br>");
         if(quantity == 1)
         {
             $("#userform").append(quantity + " " + topping + " Topping<br><br>");
         }
         else
         {
             $("#userform").append(quantity + " " + topping + " Toppings<br><br>");
         }

         //Only display user notes if notes section is not empty
         if(userInput.trim() != "")
         {
             $("#userform").append("Notes:<br>");

             
             //If the user enters a new line, make new line in notes
             //otherwise print char to page
             for(var i = 0; i < userInput.length; i++)
             {
                 if(userInput[i] == "\n")
                 {
                     $("#userform").append("<br>");
                 }
                 else
                 {
                     $("#userform").append(userInput[i]);
                 }
             }
         }
     }

     //Send the order if it does not contain 'vegan'
     if(!isVegan.includes("vegan"))
     {
        //Post the user's new order
        $.post("/neworder", {quantity: quantity, topping: topping, notes: userInput}, function(req, res, next){
        });
    }
}
