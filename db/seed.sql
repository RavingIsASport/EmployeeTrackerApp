INSERT INTO department(department_name) 
VALUES
('General Manager'),
('Assistant Manager'),
('Front Of House'),
('Back Of House');

INSERT INTO emp_roles(title, salary, department_id) 
VALUES
("GM 1", 100000, 1),
("GM 2", 90000, 1),
("Bar Manager", 85000,2),
("Kitchen Manager", 83000,2),
("Lead Server", 75000,3),
("Server", 55000,3),
("Main Cook", 60000,4);

INSERT INTO employees(first_name, last_name, role_id) 
VALUES
("Gustavo", "Garcia", 5),
("Ivan", "Pala", 7),
("Maria", "Alvarado",1),
("Joel", "Santos", 6),
("Magen", "Smith", 3),
("Chris", "Solano", 7),
("Brett", "Wagley", 6);