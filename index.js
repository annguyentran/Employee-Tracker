const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config()
const menu = () => {
  inquirer.prompt(
    [{
      type: 'list',
      message:"What would you like to do?",
      name: 'firstMenu',
      choices: ["VIEW ALL EMPLOYEES", "ADD EMPLOYEE","UPDATE EMPLOYEE ROLE", "VIEW ALL ROLES", 
      "ADD ROLE","VIEW ALL DEPARTMENTS", "ADD DEPARTMENT"]
    }]
  ).then((menuChoice)=>{
    switch(menuChoice.firstMenu){
      case "VIEW ALL EMPLOYEES":{
       
        break; 
      }
      case "ADD EMPLOYEE":{

        break;
      }
      case "UPDATE EMPLOYEE ROLE":{

        break;
      }
      case "VIEW ALL ROLES":{

        break;
      }
      case "ADD ROLE":{

        break;
      }
      case "VIEW ALL DEPARTMENTS":{

        break;
      }
      case "ADD DEPARTMENT":{

        break;
      }
    }
  });

}
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: process.env.DB_PASSWORD,
      database: 'company_db'
    },
    console.log(`Connected to the classlist_db database.`)
  );
  db.promise().query("SELECT * FROM departments").then(([res]) => console.log(res))
  menu();
  // function(para1) {


  // }
  // (para1, para2)=>{

  // }