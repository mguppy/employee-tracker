DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  department_id INT,
  title VARCHAR(30),
  salary DECIMAL,
  PRIMARY KEY (id),
  FOREIGN KEY(department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    roles_id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    FOREIGN KEY(roles_id)
    REFERENCES roles(id)
    ON DELETE SET NULL
);