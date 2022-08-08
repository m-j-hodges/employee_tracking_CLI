drop database if exists emp_directory;
create database emp_directory;

CREATE TABLE departments (
  id int NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  PRIMARY KEY id
);
CREATE TABLE employee (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(30),
  last_name varchar(30),
  role_id int,
  manager_id int,
  PRIMARY KEY id,
  FOREIGN KEY (role_id) REFERENCES role(id)
  FOREIGN KEY (manager_id) REFERENCES 
);