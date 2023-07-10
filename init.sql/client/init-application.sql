delete from application;

INSERT INTO application (`clientId`, `isNew`, `subjectOfLeasing`, brand, model, country, releaseDate, `typeOfSupplier`)
SELECT leasing_client.id, true, 'CAR', 'Skoda', 'Fabia', 'Чехия', DATE('24.09.2012'), 'OWNER'
FROM leasing_client
LIMIT 1;