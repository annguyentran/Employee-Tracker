USE company_db;
INSERT INTO departments(department_name) VALUES ("Sales"), ('Accounting'), ('engineer');
INSERT INTO roles (title, salary, department_id) VALUES ("salesman",30000,1), ('Accountant',50000,2),('Engineer',50000,3);
INSERT INTO employees (first_name, last_name, role_id,manager_id) VALUES ("Joe","smith",1,NULL),("JOHN","smith",2,NULL),("Alex","smith",3,NULL)
