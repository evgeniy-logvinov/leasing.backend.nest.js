delete from infrastructure;
delete from analitic;
delete from analitics_department;
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

INSERT INTO infrastructure (analiticsDepartmentId)
SELECT id
FROM analitics_department
LIMIT 1;
