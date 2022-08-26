drop database if exists emp_directory;
create database emp_directory;

CREATE TABLE departments (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id),
);
CREATE TABLE employee (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name varchar(30),
  last_name varchar(30),
  role_id int,
  manager_id int,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES manager(id),
);
CREATE TABLE manager (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(30),
  last_name varchar(30),
);