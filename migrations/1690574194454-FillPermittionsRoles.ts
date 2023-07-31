import { MigrationInterface, QueryRunner } from 'typeorm';

interface RolePermission {
  role: string;
  permissions: string[];
}
export class FillPermittionsRoles1690574194454 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('up');

    const rolePermissions: RolePermission[] = [
      {
        role: 'ROLE_ADMIN',
        permissions: ['USERS', 'STATISTICS', 'ORDERS'],
      },
      {
        role: 'ROLE_LEASING_CLIENT',
        permissions: ['ORDERS', 'COMPANY_PROFILE'],
      },
      {
        role: 'ROLE_LEASING_COMPANY',
        permissions: [
          'PREFERENCE_FILTER',
          'EMPLOYEES',
          'COMPANY_PROFILE',
          'ORDERS',
          'STATISTICS',
        ],
      },
      {
        role: 'ROLE_LEASING_COMPANY_HEAD_OF_SALES',
        permissions: ['STATISTICS'],
      },
      {
        role: 'ROLE_LEASING_COMPANY_HEAD_OF_ANALITICS',
        permissions: ['STATISTICS'],
      },
      {
        role: 'ROLE_LEASING_COMPANY_ANALITIC',
        permissions: ['STATISTICS'],
      },
      {
        role: 'ROLE_LEASING_COMPANY_REGION_MANAGER',
        permissions: ['STATISTICS'],
      },
      {
        role: 'ROLE_LEASING_COMPANY_MANAGER',
        permissions: ['STATISTICS'],
      },
      {
        role: 'ROLE_LEASING_COMPANY_SALES',
        permissions: ['STATISTICS'],
      },
    ];
    rolePermissions.forEach((rolePermission) => {
      queryRunner.query(
        `INSERT INTO role_permissions_permission (roleId, permissionId)
            SELECT role.id, permission.id
            FROM role, permission
            WHERE role.name = '${rolePermission.role}'
            AND permission.name in (${rolePermission.permissions
              .map((permission) => `'${permission}'`)
              .join(', ')});`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
