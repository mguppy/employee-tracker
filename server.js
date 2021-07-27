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

const addRole = [
    {
        type: "input",
        message: "What is the name of the role you would like to add?",
        name: "role"
    },
    {
        type: "input",
        message: "What is the salary for this role?",
        name: "salary"
    },
    {
        type: "list",
        message: "Which department does the role belong to?",
        name: "department",
        choices: []
    }
]

// Function to initialize app
function init() {
    
    db.query('SELECT name FROM department', function (err, results) {
        var departmentNames = results;
        console.log(departmentNames)
        addRole[2].choices = departmentNames;
    });

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
                            `SELECT COUNT(*) FROM department WHERE name = "${department}";`, function (err, results){
                                console.log(results)
                                if(results == 0) {
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
                                }
                                else {
                                    console.log("department already exists.")
                                    askQuestion();
                                }
                            });
                });
                break;
            case "Add a Role":
                inquirer.prompt(addRole).then(
                    (roleResponse) => 
                    {
                        //Populate roledepartment dropdown with the values currently in the Database
                        //Select name from department 
                        // var departmentNames = db.query(`SELECT name FROM department`);

                        //Insert new role with name, salary and departments input by the user into database
                        var name = roleResponse.role;
                        var salary = roleResponse.salary;
                        var department = roleResponse.department;
                        db.query(
                            `INSERT INTO roles(department, name, salary)
                            VALUES(${department},"${name}","${salary});`, function (err, results) 
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
                        )
                    }
                )
        }
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

init();

