const mysql = require('mysql2');
require('dotenv').config()
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

  function(para1) {


  }
  (para1, para2)=>{

  }