//Including packages for this application
const fs = require("fs");
const inquirer = require("inquirer");
const cTable = require('console.table');
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'password',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

//Presents the user with options to choose
const allOptions = [
    { 
        type: "list",
        message: "What would you like to do?",
        name: "useroption",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department","Add a Role", "Add an Employee", "Update an Employee Role","Quit"],
    }
]

// function allDepartments() {
//     // Query database
//     db.query('SELECT * FROM department', function (err, results) {
//         console.log(results);
// }

// Function to initialize app
function init() {
    //Get response from manager and decides which SQL query to run
    inquirer.prompt(allOptions).then((allOptionsResponses) => {
        if (allOptionsResponses.useroption === 'View All Departments') {
            // Post route that returns the select all departments
            // const sql = `SELECT * FROM department`
            // db.query(sql, function (err, results) {
            //     console.table(results);
            // });
            db.query('SELECT * FROM department', function (err, results) {
                console.log(results);
            });
        }
    });
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

init();

