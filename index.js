//Including packages for this application
const fs = require("fs");
const inquirer = require("inquirer");
const cTable = require('console.table');

//Presents the user with options to choose
const allOptions = [
    { 
        type: "list",
        message: "What would you like to do?",
        name: "user-option",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department","Add a Role", "Add an Employee", "Update an Employee Role","Quit"],
    }
]

// Function to initialize app
function init() {
    //Get response from manager and decides which SQL query to run
    inquirer.prompt(allOptions).then((allOptionsResponses) => {
        if (allOptionsResponses.useroption == 'View All Departments') {
            // Post route that returns the select all departments
            });
        }
    });
};