delete from types_of_financed_holding;
delete from criteria_financed_holding;
delete from legal;
delete from ip;
delete from city_of_presence_customer_coverage_area;
delete from preference_filter;
delete from sub_company;
delete from gk;
delete from subject_guarantee;
delete from city;

INSERT INTO gk (gk) VALUES (0);

INSERT INTO sub_company (accreditation, gkId, name) 
SELECT 1, id, 'ЭЛДИМ'
FROM gk
LIMIT 1;

INSERT INTO sub_company (accreditation, gkId, name) 
SELECT 0, id, 'Инвест трейд'
FROM gk
LIMIT 1;

INSERT INTO subject_guarantee (`yes`, `affilatedCompanies`, `anySubject`) VALUES (true, false, true);

INSERT INTO preference_filter (gkId, subjectGuaranteeId)
SELECT gk.id, subject_guarantee.id
FROM gk, subject_guarantee
LIMIT 1;

INSERT INTO city (name) VALUES ('Челябинск');

INSERT INTO city_of_presence_customer_coverage_area (`citiesId`, zato, preferenceFilterId, сustomerCoverageAreaId)
SELECT city.id, 1, preference_filter.id, city.id
FROM   city, preference_filter
LIMIT 1;

INSERT INTO city (name) VALUES ('Екатеринбург');

INSERT INTO city_of_presence_customer_coverage_area (`citiesId`, zato, preferenceFilterId, сustomerCoverageAreaId)
SELECT city.id, 0, preference_filter.id, city.id
FROM   city, preference_filter
WHERE city.name = 'Екатеринбург'
LIMIT 1;

INSERT INTO ip (`hasIp`, `hasPsn`, `psnRegistrationPeriod`) VALUES (true, true, 0);
INSERT INTO legal (`hasLegalEntity`, `hasOsn`, `osnRegistrationPeriod`) VALUES (true, true, 0);

INSERT INTO criteria_financed_holding (maxCountOfMonth, ipId, legalId)
SELECT 6, ip.id, legal.id
FROM ip, legal
LIMIT 1;

INSERT INTO criteria_financed_holding (maxCountOfMonth) VALUES (7);
INSERT INTO criteria_financed_holding (maxCountOfMonth) VALUES (8);

INSERT INTO types_of_financed_holding (`preferenceFilterId`, name, `newCriteriaId`,  `previouslyUsedCriteriaId`, `returnableCriteriaId`)
SELECT preference_filter.id, 'Легковой атомобиль', asa.id, asb.id, asd.id
FROM preference_filter, criteria_financed_holding asa, criteria_financed_holding asb, criteria_financed_holding asd
WHERE asa.maxCountOfMonth = 6 and asb.maxCountOfMonth = 7 and asd.maxCountOfMonth = 8
LIMIT 1;

INSERT INTO types_of_financed_holding (`preferenceFilterId`, name, selected)
SELECT id, 'Грузовой транспорт', true
FROM preference_filter
LIMIT 1;