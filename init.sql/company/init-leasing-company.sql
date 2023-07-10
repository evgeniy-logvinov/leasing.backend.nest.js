delete from leasing_company;

INSERT INTO leasing_company (preferenceFilterId, infrastructureId, companyProfileId)
SELECT preference_filter.id, infrastructure.id, company_profile.id
FROM preference_filter, infrastructure, company_profile
LIMIT 1;
