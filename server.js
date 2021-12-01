const inquirer = require("inquirer");
const mysql = require("mysql2");
const conTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "Gusgus23",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);
db.connect((err) => {
  if (err) console.log("Not working");
  startQs();
});
const startQs = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "fisrtQ",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Finish",
      ],
    })
    .then((answers) => {
      switch (answers.fisrtQ) {
        case "View all departments":
          db.query(`SELECT * FROM department`, (err, table) => {
            if (err) throw err;
            console.table(table);
            startQs();
          });
          break;
        case "View all roles":
          db.query(`SELECT * FROM emp_roles`, (err, table) => {
            if (err) throw err;
            console.table(table);
            startQs();
          });
          break;
        case "View all employees":
          db.query(`SELECT * FROM employees`, (err, table) => {
            if (err) throw err;
            console.table(table);
            startQs();
          });
          break;
        case "Add a department":
          inquirer
            .prompt({
              type: "input",
              name: "department",
              message: "Enter name of department:",
            })
            .then((data) => {
              db.query(
                `INSERT INTO department(department_name) VALUES (?)`,
                data.department,
                (err, table) => {
                  if (err) throw err;
                  console.table(table);
                  startQs();
                }
              );
            });
          break;
        case "Add a role":
          inquirer
            .prompt([
              {
                type: "input",
                name: "role",
                message: "Enter name of role:",
              },
              {
                type: "input",
                name: "salary",
                message: "Enter Salary:",
              },
              {
                type: "input",
                name: "depID",
                message: "Department ID this role belongs in:",
              },
            ])
            .then((data) => {
              db.query(
                `INSERT INTO emp_roles(title, salary, department_id) 
                VALUES('${data.role}', ${data.salary},${data.depID})`,
                (err, table) => {
                  if (err) throw err;
                  console.table(table);
                  startQs();
                }
              );
            });
          break;
        case "Add an employee":
          inquirer
            .prompt([
              {
                type: "input",
                name: "firstName",
                message: "Enter first name:",
              },
              {
                type: "input",
                name: "lastName",
                message: "Enter last name:",
              },
              {
                type: "input",
                name: "roleID",
                message: "Enter role ID:",
              },
            ])
            .then((data) => {
              db.query(
                `INSERT INTO employees(first_name, last_name, role_id) 
                VALUES('${data.firstName}','${data.lastName}', ${data.roleID})`,
                (err, table) => {
                  if (err) throw err;
                  console.table(table);
                  startQs();
                }
              );
            });
          break;
        case "Finish":
          db.end();
          console.log("Finished");
      }
    });
};
