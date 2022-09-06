const mysql = require('mysql2');
require('console.table');
const inquirer = require('inquirer');
require('dotenv').config()
class DB {
  constructor() {
    this.db = mysql.createConnection(
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
  }

  getDepartments() {
    return this.db.promise().query("select * from departments;")
  }

  getRoles() {
    return this.db.promise().query("select roles.id, title, salary, department_name from roles join departments on roles.department_id = departments.id;")

  }

  getEmployees() {
    let query = "select employees.id, employees.first_name, employees.last_name, title, department_name, salary, managers.first_name as manager_first, managers.last_name as manager_last "
    query += "from employees "
    query += "join roles on employees.role_id = roles.id "
    query += "join departments on roles.department_id = departments.id "
    query += "left join employees managers on employees.manager_id = managers.id;"
    return this.db.promise().query(query)

  }

  addDepartments(departmentName){
    return this .db.promise().query("INSERT INTO departments(department_name) VALUES (?);", departmentName)

  }

  addRoles(roleName, salary, departmentName){
    return this .db.promise().query("INSERT INTO roles (title, salary, department_id) VALUES(?,?,?);", [roleName,salary,departmentName])
  }

  addEmployees(first_name, last_name, role, manager){
    return this .db.promise().query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)", [first_name,last_name,role,manager])
  }
}
const viewDepartments = async () => {
  let db = new DB()
  const [departments] = await db.getDepartments();
  console.table(departments)
  menu()
}

const viewRoles = async () => {
  let db = new DB()
  const [roles] = await db.getRoles();
  console.table(roles)
  menu()
}

const viewEmployees = async () => {
  let db = new DB()
  const [employees] = await db.getEmployees();
  console.table(employees)
  menu()
}

const addDepartments = async () => {
  let db = new DB()
  const userInput = await inquirer.prompt([

    {
      type: "input",
      message:"Please enter department name",
      name: "department_name"
    }
  ])
  

  
  await db.addDepartments(userInput.department_name);
  console.log("Added department: " + userInput.department_name)
  menu()
}

const addEmployees = async () => {
  let db = new DB();
  const [roles] = await db.getRoles();
  const roleChoices = roles.map((role) =>{
    return {name: role.title, value: role.id}
  })

  const [managers] = await db.getEmployees();
  const managerChoices = managers.map((manager) =>{
    return {name: manager.first_name + " " + manager.last_name, value: manager.id}
  })
  managerChoices.push({
    name: "none",
    value: null
  })

  const userInput = await inquirer.prompt([
    {
      type: "input",
      message:"What the first name of the employee?",
      name: "first_name"

    },
    {
      type: "input",
      message:"What is the last name of the employee?",
      name: "last_name"

    },
    {
      type: "list",
      message:"What is role?",
      name: "role_id",
      choices: roleChoices
    },

    {
      type: "list",
      message:"Who is the manager?",
      name: "manager_id",
      choices: managerChoices
    }

  ])

  await db.addEmployees(userInput.first_name, userInput.last_name, userInput.role_id, userInput.manager_id)
  console.log("Employee has been added: " + userInput.first_name + " " + userInput.last_name)
  menu()

}


const addRoles = async () => {
  let db = new DB()
  const [departments] = await db.getDepartments();
  const departmentChoices = departments.map((department) =>{
    return {name: department.department_name, value: department.id}
  })
  const userInput = await inquirer.prompt([
    {
      type: "input",
      message:"What is the name of the role?",
      name: "role_name"

    },
    {
      type: "input",
      message:"What is the salary?",
      name: "salary"

    },
    {
      type: "list",
      message:"What is the department?",
      name: "department_id",
      choices: departmentChoices
    }

  ])
await db.addRoles(userInput.role_name, userInput.salary, userInput.department_id)
console.log("Added role: " + userInput.role_name)
menu();
}
const menu = () => {
  inquirer.prompt(
    [{
      type: 'list',
      message: "What would you like to do?",
      name: 'firstMenu',
      choices: ["VIEW ALL EMPLOYEES", "ADD EMPLOYEE", "UPDATE EMPLOYEE ROLE", "VIEW ALL ROLES",
        "ADD ROLE", "VIEW ALL DEPARTMENTS", "ADD DEPARTMENT"]
    }]
  ).then((menuChoice) => {
    switch (menuChoice.firstMenu) {
      case "VIEW ALL EMPLOYEES": {
        viewEmployees()
        break;
      }
      case "ADD EMPLOYEE": {
        addEmployees()
        break;
      }
      case "UPDATE EMPLOYEE ROLE": {

        break;
      }
      case "VIEW ALL ROLES": {
        viewRoles()
        break;
      }
      case "ADD ROLE": {
        addRoles()

        break;
      }
      case "VIEW ALL DEPARTMENTS": {
        viewDepartments();
        break;
      }
      case "ADD DEPARTMENT": {
        addDepartments();
        break;
      }
    }
    console.log(menuChoice.firstMenu)
  });

}
// const db = mysql.createConnection(
//     {
//       host: 'localhost',
//       // MySQL username,
//       user: 'root',
//       // MySQL password
//       password: process.env.DB_PASSWORD,
//       database: 'company_db'
//     },
//     console.log(`Connected to the classlist_db database.`)
//   );
//   db.promise().query("SELECT * FROM departments").then(([res]) => console.log(res))


const start = () => {
  menu()

}

start()
  // function(para1) {


  // }
  // (para1, para2)=>{

  // }