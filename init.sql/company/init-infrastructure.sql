delete from infrastructure;
delete from analitic;
delete from analitics_department;
delete from manager;
delete from city_manager;
delete from sales_department;
delete from employee;

INSERT INTO employee (`firstName`, `lastName`, patronymic, email, phone, `mobilePhone`) VALUES ('Вячеслав', 'Логвинов', 'Константинович', 'vyacheslav@mail.ru', '+717777777', '+727777778');

INSERT INTO analitics_department (`headId`)
SELECT id
FROM employee
LIMIT 1;

INSERT INTO analitic (analiticsDepartmentId, `firstName`, `lastName`, patronymic, email, phone, `mobilePhone`)
SELECT id, 'Евгений', 'Логвинов', 'Константинович', 'evgeniy@mail.ru', '+777777777', '+777777778'
FROM analitics_department
LIMIT 1;

INSERT INTO analitic (analiticsDepartmentId, `firstName`, `lastName`, patronymic, email, phone, `mobilePhone`)
SELECT id, 'Ольга', 'Логвинова', 'Витальевна', 'olga@mail.ru', '+777777779', '+777777780'
FROM analitics_department
LIMIT 1;

INSERT INTO employee (`firstName`, `lastName`, patronymic, email, phone, `mobilePhone`) VALUES ('Константин', 'Логвинов', 'Константинович', 'konst@mail.ru', '+717777977', '+727777978');

INSERT INTO sales_department (`headId`)
SELECT id
FROM employee
WHERE `firstName` = 'Константин'
LIMIT 1;

INSERT INTO employee (`firstName`, `lastName`, patronymic, email, phone, `mobilePhone`) VALUES ('Руфина', 'Логинова', 'Андреевна', 'rufa@mail.ru', '+777737777', '+775777778');
INSERT INTO employee (`firstName`, `lastName`, patronymic, email, phone, `mobilePhone`) VALUES ('Лариса', 'Катасонова', 'Андреевна', 'katas@mail.ru', '+777737177', '+775757778');

INSERT INTO city_manager (salesDepartmentId, headId)
SELECT sales_department.id, employee.id
FROM sales_department, employee
WHERE employee.`firstName` in ('Лариса', 'Руфина')
LIMIT 2;

INSERT INTO manager (`cityManagerId`, `firstName`, `lastName`, patronymic, email, phone, `mobilePhone`)
SELECT city_manager.id, 'Светлана', 'Логвинова', 'Александровна', 'cvet@mail.ru', '+777717777', '+777727778'
FROM city_manager, employee
WHERE city_manager.headId = employee.id
AND employee.`firstName` = 'Руфина'
LIMIT 1;

INSERT INTO manager (`cityManagerId`, `firstName`, `lastName`, patronymic, email, phone, `mobilePhone`)
SELECT city_manager.id, 'Наталья', 'Махортова', 'Александровна', 'cvet@mail.ru', '+777727777', '+777737778'
FROM city_manager, employee
WHERE city_manager.headId = employee.id
AND employee.`firstName` = 'Руфина'
LIMIT 1;


INSERT INTO manager (`cityManagerId`, `firstName`, `lastName`, patronymic, email, phone, `mobilePhone`)
SELECT city_manager.id, 'Игорь', 'Семченко', 'Витальевич', 'igor@mail.ru', '+777717777', '+777727778'
FROM city_manager, employee
WHERE city_manager.headId = employee.id
AND employee.`firstName` = 'Лариса'
LIMIT 1;

INSERT INTO manager (`cityManagerId`, `firstName`, `lastName`, patronymic, email, phone, `mobilePhone`)
SELECT city_manager.id, 'Алексей', 'Семченко', 'Игорьевич', 'alex@mail.ru', '+771727777', '+777537778'
FROM city_manager, employee
WHERE city_manager.headId = employee.id
AND employee.`firstName` = 'Лариса'
LIMIT 1;

INSERT INTO infrastructure (analiticsDepartmentId, salesDepartmentId)
SELECT analitics_department.id, sales_department.id
FROM analitics_department, sales_department
LIMIT 1;
