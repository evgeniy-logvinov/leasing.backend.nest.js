delete from role;
delete from permission;
delete from role_permissions_permission;

INSERT INTO permission (name) VALUES ('USERS');
INSERT INTO permission (name) VALUES ('EMPLOYEES');
INSERT INTO permission (name) VALUES ('COMPANY_PROFILE');
INSERT INTO permission (name) VALUES ('PREFERENCE_FILTER');
INSERT INTO permission (name) VALUES ('HEADS_OF_DEPARTMENTS');
INSERT INTO permission (name) VALUES ('ORDERS');
INSERT INTO permission (name) VALUES ('STATISTICS');
-- SELECT * FROM permission;
INSERT INTO role (name) VALUES ('ROLE_ADMIN');
INSERT INTO role (name) VALUES ('ROLE_LEASING_CLIENT');
INSERT INTO role (name) VALUES ('ROLE_LEASING_COMPANY');
INSERT INTO role (name) VALUES ('ROLE_LEASING_COMPANY_HEAD_OF_SALES');
INSERT INTO role (name) VALUES ('ROLE_LEASING_COMPANY_HEAD_OF_ANALITICS');
INSERT INTO role (name) VALUES ('ROLE_LEASING_COMPANY_ANALITIC');
INSERT INTO role (name) VALUES ('ROLE_LEASING_COMPANY_REGION_MANAGER');
INSERT INTO role (name) VALUES ('ROLE_LEASING_COMPANY_MANAGER');

INSERT INTO role (name) VALUES ('ROLE_LEASING_COMPANY_SALES');
-- SELECT * FROM role;

INSERT INTO role_permissions_permission (roleId, permissionId)
SELECT role.id, permission.id
FROM role, permission
WHERE role.name = 'ROLE_ADMIN'
AND permission.name in ('USERS', 'STATISTICS', 'ORDERS');

INSERT INTO role_permissions_permission (roleId, permissionId)
SELECT role.id, permission.id
FROM role, permission
WHERE role.name = 'ROLE_LEASING_CLIENT'
AND permission.name in ('ORDERS', 'COMPANY_PROFILE');

INSERT INTO role_permissions_permission (roleId, permissionId)
SELECT role.id, permission.id
FROM role, permission
WHERE role.name = 'ROLE_LEASING_COMPANY'
AND permission.name in ('PREFERENCE_FILTER', 'EMPLOYEES', 'COMPANY_PROFILE', 'ORDERS', 'STATISTICS');

INSERT INTO role_permissions_permission (roleId, permissionId)
SELECT role.id, permission.id
FROM role, permission
WHERE role.name = 'ROLE_LEASING_COMPANY_HEAD_OF_SALES'
AND permission.name in ('STATISTICS');

INSERT INTO role_permissions_permission (roleId, permissionId)
SELECT role.id, permission.id
FROM role, permission
WHERE role.name = 'ROLE_LEASING_COMPANY_HEAD_OF_ANALITICS'
AND permission.name in ('STATISTICS');

INSERT INTO role_permissions_permission (roleId, permissionId)
SELECT role.id, permission.id
FROM role, permission
WHERE role.name = 'ROLE_LEASING_COMPANY_ANALITIC'
AND permission.name in ('STATISTICS');

INSERT INTO role_permissions_permission (roleId, permissionId)
SELECT role.id, permission.id
FROM role, permission
WHERE role.name = 'ROLE_LEASING_COMPANY_REGION_MANAGER'
AND permission.name in ('STATISTICS');

INSERT INTO role_permissions_permission (roleId, permissionId)
SELECT role.id, permission.id
FROM role, permission
WHERE role.name = 'ROLE_LEASING_COMPANY_MANAGER'
AND permission.name in ('STATISTICS');

INSERT INTO role_permissions_permission (roleId, permissionId)
SELECT role.id, permission.id
FROM role, permission
WHERE role.name = 'ROLE_LEASING_COMPANY_SALES'
AND permission.name in ('STATISTICS');

-- SELECT role.name, permission.name
-- FROM role, permission, role_permissions_permission
-- WHERE role_permissions_permission.roleId = role.id
-- AND role_permissions_permission.permissionId = permission.id