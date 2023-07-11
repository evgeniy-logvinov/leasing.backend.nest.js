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
LIMIT 1;

