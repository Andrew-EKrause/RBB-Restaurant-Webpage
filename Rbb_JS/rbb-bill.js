/*
 * The JavaScript file is utilized by the rbb-bill.html
 * page of the Riverside Burger Bash website. The file
 * provides simple functions involving restaurant order
 * calculations. The file also provides a function that
 * enables users to add items part of their order to a 
 * table on the bill page of the website.
 *
 * Project: Riverside Burger Bash: Grid
 * Author: Andrew Krause
 * Date: 11/16/2022
 *
 */

// --> SECTION: Add the functions for the order/bill calculation features.

// Wait to load the JavaScript until all of the HTML content is loaded.
// document.addEventListener("DOMContentLoaded", loadContent); // --> Not currently using.

// Create a global variable to count 
// the serial number (S.No).
var serialNumnber = 1;

// Create a global subtotals array in order to
// calculate the total bill for the customer.
var orderSubtotals = [];

// Create a global variable for determining
// if the user already calculated their totals.
var totalsCalculated = false;

// Create a function to add a row
// to the table when the user clicks
// the "Add Item" button.
function addItem() {

    // Prevent the form above from refreshing the page.
    event.preventDefault();

    // Create variables to get the correct fields for the table.
    var itemName = document.getElementById("nameField").value;
    var itemPrice = document.getElementById("priceField").value;
    var itemQuantity = document.getElementById("quantityField").value;

    // Select the table in order to add items to it.
    var orderTable = document.getElementById("orderTable");

    // ====================================================================

    // Complete the action of adding info to the table.
    // Be sure to style it properly.
    var orderTableRow = orderTable.insertRow(serialNumnber++);

    // Insert the cells into the table: S.No, and Item Name.
    var orderColNumber = orderTableRow.insertCell(0);
    var orderColName = orderTableRow.insertCell(1);

    // Add attributes for the price column to format it properly.
    var orderColPrice = orderTableRow.insertCell(2);
    orderColPrice.setAttribute("align", "right");
    orderColPrice.setAttribute("style", "padding-right: 10px;");

    // Insert the cells into the table: Quantity.
    var orderColQuantity = orderTableRow.insertCell(3);

    // Add attributes to the total order for a given item.
    var orderColTotal = orderTableRow.insertCell(4);
    orderColTotal.setAttribute("align", "right");
    orderColTotal.setAttribute("style", "padding-right: 10px;");
    orderColTotal.setAttribute("class", "money-highlight");

    // ====================================================================

    // Change the inner HTML in order to properly
    // insert the column cells into the table.
    orderColNumber.innerHTML = parseFloat(serialNumnber) - parseFloat(1);
    orderColName.innerHTML = itemName;
    orderColPrice.innerHTML = "$" + parseFloat(itemPrice).toFixed(2);
    orderColQuantity.innerHTML = itemQuantity;

    // Perform the calculation to display the subtotal for a given item order.
    var orderColTotalCalc = Math.round((parseFloat(itemPrice) * parseFloat(itemQuantity)) * 100) / 100;
    orderColTotal.innerHTML = "$" + orderColTotalCalc.toFixed(2);

    // Add the total to the array in order to calculate
    // what the customer will have to pay.
    orderSubtotals.push(orderColTotalCalc.toFixed(2));
}

// The function calculates the subtotals,
// calculates the tax, adds up the tips,
// and computes how much the customer owes.
function calculateTotals() {

    // Prevent the form above from refreshing the page.
    event.preventDefault();

    // Create a variable in order to display a potential error message to the user.
    var finalMessageTotals = document.getElementById("finalPaymentMessage");

    // Check if any orders were calculated.
    // If orders were not calculated, then
    // return and do not execute any other
    // operations.
    if(orderSubtotals.length <= 0) {

        // Print out the error message and return from the function.
        finalMessageTotals.innerHTML = "Please add at at least one item to your order before calculating the totals.";
        finalMessageTotals.setAttribute("style", "color: red;");
        return;
    }

    // Calculate the current total, which is the sum of all
    // of the costs for all the items that were ordered.
    var currentTotalPrice = 0;
    
    // Create a loop to add up the totals for the bill.
    for(let i = 0; i < orderSubtotals.length; i++) {
        currentTotalPrice = parseFloat(currentTotalPrice) + parseFloat(orderSubtotals[i]);
    }

    // Add the total bill to the table. This value increases each
    // time the user adds a new entry to the JavaScript table.
    var orderOverallTotal = document.getElementById("overallTotal");
    orderOverallTotal.innerHTML = "$" + currentTotalPrice.toFixed(2);

    // ====================================================================

    // Create a variable to calculate the total taxes on the overall order.
    var orderOverallTaxes = document.getElementById("overallTax");
    var orderOverallTaxesCalc = parseFloat(0.055) * parseFloat(currentTotalPrice.toFixed(2));
    orderOverallTaxes.innerHTML = "$" + orderOverallTaxesCalc.toFixed(2);

    // ====================================================================

    // Create a variable for calculating the total tips on the overall order.
    var orderOverallTips = document.getElementById("overallTip");
    var orderOverallTipsCalc = 0;

    // Include conditionals to help with the process of
    // calculating the tip for the customer's order. If
    // user selected 10% tip, calculate tip from the total.
    if(document.getElementById("tenTip").checked) {

        // Calculate out the 10% tip by using the sum of the subtotals.
        orderOverallTipsCalc = parseFloat(0.10) * parseFloat(currentTotalPrice.toFixed(2));
        orderOverallTips.innerHTML = "$" + orderOverallTipsCalc.toFixed(2);

    // If user selected 15% tip, calculate tip from the total.
    } else if(document.getElementById("fifteenTip").checked) {

        // Calculate out the 15% tip by using the sum of the subtotals.
        orderOverallTipsCalc = parseFloat(0.15) * parseFloat(currentTotalPrice.toFixed(2));
        orderOverallTips.innerHTML = "$" + orderOverallTipsCalc.toFixed(2);

    // If user selected 20% tip, calculate tip from the total.
    } else if(document.getElementById("twentyTip").checked) {

        // Calculate out the 20% tip by using the sum of the subtotals.
        orderOverallTipsCalc = parseFloat(0.20) * parseFloat(currentTotalPrice.toFixed(2));
        orderOverallTips.innerHTML = "$" + orderOverallTipsCalc.toFixed(2);

    // If the user did not select any tip options, no tip.
    } else {
        // Just display zero for the tips if the user did not select any.
        orderOverallTips.innerHTML = "$" + orderOverallTipsCalc.toFixed(2);
    }

    // ====================================================================

    // Create a variable for calculating the total amount the customer owes.
    var customerOwesTotal = document.getElementById("customerPaysTotal");
    var customerOwesTotalCalc = parseFloat(currentTotalPrice.toFixed(2)) + parseFloat(orderOverallTaxesCalc.toFixed(2)) + parseFloat(orderOverallTipsCalc.toFixed(2));
    customerOwesTotal.innerHTML = "$" + customerOwesTotalCalc.toFixed(2);  
    
    // Set the global boolean variable to true
    // so that checks pass in the payTheBill()
    // function.
    totalsCalculated = true;
}

// The function "pays" the bill. If the user
// has selected a payment type, the bill is
// completed and a thank you message is then
// printed out. Otherwise, error checks occur.
function payTheBill() {

    // Prevent the form above from refreshing the page.
    event.preventDefault();

    // Create variables in order to display the final messages to the user.
    var paymentTypeFeedback = document.getElementById("paymentType");
    var finalMessage = document.getElementById("finalPaymentMessage");

    // If the global array of orders is empty, display
    // an error message and return from the function.
    if(orderSubtotals.length <= 0) {

        // Print out the error message and return from the function.
        finalMessage.innerHTML = "Please add your items and calculate the total before paying your bill.";
        finalMessage.setAttribute("style", "color: red;");
        return;
    }

    // If the global boolean is false, which indicates the
    // user never calculated their totals, then display an
    // error message and return.
    if(!totalsCalculated) {

        // Print out the error message and return from the function.
        finalMessage.innerHTML = "Please calculate your totals before paying your bill.";
        finalMessage.setAttribute("style", "color: red;");
        return;
    }

    // Create two variables for changing text displayed below buttons.
    var credit = "Bill paid with card: XXXX-XXXX-XXXX-0621";
    var cash = "Bill paid by cash.";

    // Include conditionals to determine if the user 
    // selected one of the two payment options.
    // If user selected credit as payment, print out
    // message and complete.
    if(document.getElementById("creditOption").checked) {

        // Display the payment type selected as credit and show a final message.
        paymentTypeFeedback.innerHTML = credit;
        finalMessage.innerHTML = "Thank you for your business. Hope to see you again!";
        finalMessage.setAttribute("style", "color: green;");

    // If user selected cash as payment, print out message and complete.
    } else if(document.getElementById("cashOption").checked) {

        // Display the payment type selected as cash and show a final message.
        paymentTypeFeedback.innerHTML = cash;
        finalMessage.innerHTML = "Thank you for your business. Hope to see you again!";
        finalMessage.setAttribute("style", "color: green;");

    // If the user did not select any payment options, error and return.
    } else {
        // Print out the error message and return from the function.
        finalMessage.innerHTML = "Please select the payment type before paying your bill.";
        finalMessage.setAttribute("style", "color: red;");
        return;
    }
}
