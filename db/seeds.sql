INSERT INTO department (id, name)
VALUES (001, "Database Engineering"),
       (002, "Software Engineering"),
       (003, "Security Engineering"),
       (004, "IT Risk and Compliance");

INSERT INTO roles (id, title, salary, department_id)
VALUES (001, "Database Administrator", 90000, 001),
       (002, "Software Engineer", 85000, 002),
       (003, "Security Engineer", 75000, 003),
       (004, "IT Risk Analyst", 80000, 004);

INSERT INTO employee(id, first_name, last_name, roles_id, manager_id)
VALUES (001, "Tom", "Hanks", 001),
       (002, "Mark", "Zuckerburg", 002, 001),
       (003, "Simone", "Biles", 003, 001),
       (004, "Maryam", "Guppy", 004, 001);