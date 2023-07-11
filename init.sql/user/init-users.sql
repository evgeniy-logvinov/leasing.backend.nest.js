TRUNCATE TABLE application CASCADE;
TRUNCATE TABLE leasing_user_info CASCADE;
TRUNCATE TABLE public.user CASCADE;

-- ADMIN
INSERT INTO public."user" ("role_id", "email", "isEmailConfirmed", "id")
SELECT "role"."id", 'adminEmail@gmail.com', true, 'b98eec27-007b-488e-ac8b-d110502c6f0c'
FROM "role"
WHERE "role".name = 'ROLE_ADMIN';

-- CLIENT
INSERT INTO public."user" ("role_id", "email", "isEmailConfirmed", "id")
SELECT "role"."id", 'clientUserEmail@gmail.com', true, '13883097-2db5-421e-9a3c-7cd8e9e4994b'
FROM "role"
WHERE "role".name = 'ROLE_LEASING_CLIENT';

INSERT INTO leasing_user_info ("username", "inn", "state", "invited", "description", "userId", "type")
VALUES ('leasing client test', '0123456789', 'REG', true, 'test registred client user', '13883097-2db5-421e-9a3c-7cd8e9e4994b', 'Client');

-- COMPANY
INSERT INTO public."user" ("role_id", "email", "isEmailConfirmed", "id")
SELECT "role"."id", 'companyUserEmail@gmail.com', true, 'b98eec27-007b-488e-ac8b-d110502c6f0b'
FROM "role"
WHERE "role".name = 'ROLE_LEASING_COMPANY';

INSERT INTO leasing_user_info ("username", "inn", "state", "invited", "description", "userId", "type")
VALUES ('leasing company test', '9876543210', 'REG', true, 'test registred company user', 'b98eec27-007b-488e-ac8b-d110502c6f0b', 'LeasingCompany');

-- -- HEAD OF SALES
-- INSERT INTO public."user" ("role_id", "email", "isEmailConfirmed", "id")
-- SELECT "role"."id", 'headOfSales@gmail.com', true, 'b98eec27-007b-488e-ac8b-d110502c6f0d'
-- FROM "role"
-- WHERE "role".name = 'ROLE_LEASING_COMPANY_HEAD_OF_SALES';

-- INSERT INTO leasing_user_info ("username", "inn", "state", "invited", "description", "userId", "type")
-- VALUES ('leasing client test', '0123456789', 'REG', true, 'test registred client user', '13883097-2db5-421e-9a3c-7cd8e9e4994b', 'Client');

-- -- HEAD OF ANALITICS
-- INSERT INTO public."user" ("role_id", "email", "isEmailConfirmed", "id")
-- SELECT "role"."id", 'headOfAnalitics@gmail.com', true, 'b98eec27-007b-488e-ac8b-d110502c6f0d'
-- FROM "role"
-- WHERE "role".name = 'ROLE_LEASING_COMPANY_HEAD_OF_ANALITICS';

-- INSERT INTO leasing_user_info ("username", "inn", "state", "invited", "description", "userId", "type")
-- VALUES ('leasing client test', '0123456789', 'REG', true, 'test registred client user', '13883097-2db5-421e-9a3c-7cd8e9e4994b', 'Client');

-- -- ANALITIC
-- INSERT INTO public."user" ("role_id", "email", "isEmailConfirmed", "id")
-- SELECT "role"."id", 'companyAnalitic@gmail.com', true, 'b98eec27-007b-488e-ac8b-d110502c6f0d'
-- FROM "role"
-- WHERE "role".name = 'ROLE_LEASING_COMPANY_ANALITIC';

-- INSERT INTO leasing_user_info ("username", "inn", "state", "invited", "description", "userId", "type")
-- VALUES ('leasing client test', '0123456789', 'REG', true, 'test registred client user', '13883097-2db5-421e-9a3c-7cd8e9e4994b', 'Client');

-- -- REGION MANAGER
-- INSERT INTO public."user" ("role_id", "email", "isEmailConfirmed", "id")
-- SELECT "role"."id", 'companyRegionManager@gmail.com', true, 'b98eec27-007b-488e-ac8b-d110502c6f0d'
-- FROM "role"
-- WHERE "role".name = 'ROLE_LEASING_COMPANY_REGION_MANAGER';

-- INSERT INTO leasing_user_info ("username", "inn", "state", "invited", "description", "userId", "type")
-- VALUES ('leasing client test', '0123456789', 'REG', true, 'test registred client user', '13883097-2db5-421e-9a3c-7cd8e9e4994b', 'Client');

-- -- SALES
-- INSERT INTO public."user" ("role_id", "email", "isEmailConfirmed", "id")
-- SELECT "role"."id", 'companySales@gmail.com', true, 'b98eec27-007b-488e-ac8b-d110502c6f0d'
-- FROM "role"
-- WHERE "role".name = 'ROLE_LEASING_COMPANY_SALES';

-- INSERT INTO leasing_user_info ("username", "inn", "state", "invited", "description", "userId", "type")
-- VALUES ('leasing client test', '0123456789', 'REG', true, 'test registred client user', '13883097-2db5-421e-9a3c-7cd8e9e4994b', 'Client');
