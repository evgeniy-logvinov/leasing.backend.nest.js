delete from commercial_proposal;

INSERT INTO commercial_proposal (applicationId, fullPrice)
SELECT application.id, 1000
FROM application
LIMIT 1;