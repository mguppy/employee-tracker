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
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Quit"],
    }
]

const addDepartment = [
    {
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "department"
    }
]

// Function to initialize app
function init() {
    askQuestion();
};

function askQuestion() {
    inquirer.prompt(allOptions).then((allOptionsResponses) => {
        // Switch cases
        var userSelection = allOptionsResponses.useroption;
        switch (userSelection) {
            case "View All Departments":
                db.query('SELECT * FROM department', function (err, results) {
                    console.table(results);
                    askQuestion();
                });
                break;
            case "View All Roles":
                db.query('SELECT * FROM roles', function (err, results) {
                    console.table(results);
                    askQuestion();
                });
                break;
            case "View All Employees":
                db.query('SELECT * from employee', function (err, results) {
                    console.table(results);
                    askQuestion();
                });
                break;
            case "Add a Department":
                inquirer.prompt(addDepartment).then(
                    (departmentResponse) => 
                    {
                        var department = departmentResponse.department;
                        db.query(
                            `INSERT INTO department(name)
                            VALUES("${department}");`, function (err, results) 
                            {
                                if (err) 
                                {
                                    console.log( "error:" + err.message);
                                    return;
                                }
                                else 
                                {
                                    console.log("success!");
                                }
                                askQuestion();
                            }
                        );
                });
                break;
        }
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

init();

