delete from leasing_client;

INSERT INTO leasing_client (`clientProfileId`)
SELECT client_profile.id
FROM client_profile
LIMIT 1;
