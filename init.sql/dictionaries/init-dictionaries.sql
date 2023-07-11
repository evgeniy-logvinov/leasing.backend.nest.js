delete from city;
delete from district;
delete from area;
delete from country;

INSERT INTO country (name) VALUES ('Россия');

INSERT INTO area (`countryId`, name)
SELECT id, 'Уральский федеральный округ'
FROM country
LIMIT 1;

INSERT INTO district (areaId, name)
SELECT id, 'Челябинская область'
FROM area
LIMIT 1;

INSERT INTO city (districtId, name)
SELECT id, 'Челябинск'
FROM district
WHERE name = 'Челябинская область'
LIMIT 1;

INSERT INTO city (districtId, name)
SELECT id, 'Чебаркуль'
FROM district
WHERE name = 'Челябинская область'
LIMIT 1;

INSERT INTO district (areaId, name)
SELECT id, 'Свердловская область'
FROM area
WHERE name = 'Уральский федеральный округ'
LIMIT 1;

INSERT INTO city (districtId, name)
SELECT id, 'Екатеринбург'
FROM district
WHERE name = 'Свердловская область'
LIMIT 1;

