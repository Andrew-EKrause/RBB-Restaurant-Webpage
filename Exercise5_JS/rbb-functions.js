/*  
 * The JavaScript file is utilized by most pages
 * of the Riverside Burger Bash website given that 
 * most pages contain a menu navigation bar. The 
 * file provides simple functions for animating 
 * the links in the menu navbar in the event that
 * they are hovered over or clicked. The functions 
 * also ensure that the coorect link is highlighted 
 * to represent the active page (the page being viewed) 
 * on the website.
 *
 * Project: Riverside Burger Bash
 * Author: Andrew Krause
 * Class: CS 202
 * Date: 10/14/2022
 * 
 */

// --> SECTION: Style the links in the menu navbar for menu pages

// Get the elements in the navbar by their ids.
document.getElementById("menu-burgers").addEventListener("click", burgers);
document.getElementById("menu-appetizers").addEventListener("click", appetizers);
document.getElementById("menu-beverages").addEventListener("click", beverages);

// Add a style (a highlight) to the "Burgers" button if it is clicked.
function burgers() {
  document.getElementById("menu-burgers").classList.add("menu-is-active");
  document.getElementById("menu-appetizers").classList.remove("menu-is-active");
  document.getElementById("menu-beverages").classList.remove("menu-is-active");
}

// Add a style (a highlight) to the "Appetizers" button if it is clicked.
function appetizers() {
  document.getElementById("menu-burgers").classList.remove("menu-is-active");
  document.getElementById("menu-appetizers").classList.add("menu-is-active");
  document.getElementById("menu-beverages").classList.remove("menu-is-active");
}

// Add a style (a highlight) to the "Beverages" button if it is clicked.
function beverages() {
  document.getElementById("menu-burgers").classList.remove("menu-is-active");
  document.getElementById("menu-appetizers").classList.remove("menu-is-active");
  document.getElementById("menu-beverages").classList.add("menu-is-active");
}
