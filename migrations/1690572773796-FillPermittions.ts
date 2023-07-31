import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class FillPermittions1690572773796 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('up');
    const permissions = [
      'USERS',
      'EMPLOYEES',
      'COMPANY_PROFILE',
      'PREFERENCE_FILTER',
      'HEADS_OF_DEPARTMENTS',
      'ORDERS',
      'STATISTICS',
    ];
    permissions.forEach((permission) => {
      queryRunner.query(
        `INSERT INTO permission (name, id) VALUES ('${permission}', '${uuidv4()}')`,
      );
    });

    const roles = [
      'ROLE_ADMIN',
      'ROLE_LEASING_CLIENT',
      'ROLE_LEASING_COMPANY',
      'ROLE_LEASING_COMPANY_HEAD_OF_SALES',
      'ROLE_LEASING_COMPANY_HEAD_OF_ANALITICS',
      'ROLE_LEASING_COMPANY_ANALITIC',
      'ROLE_LEASING_COMPANY_REGION_MANAGER',
      'ROLE_LEASING_COMPANY_MANAGER',
      'ROLE_LEASING_COMPANY_SALES',
    ];

    roles.forEach((role) => {
      queryRunner.query(
        `INSERT INTO role (name, id) VALUES ('${role}', '${uuidv4()}')`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
