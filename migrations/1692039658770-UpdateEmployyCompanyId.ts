import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateEmployyCompanyId1692039658770 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `UPDATE employee 
         SET companyId = (
          SELECT id
          FROM leasing_company
          WHERE leasing_company.companyProfileId is not null
        )`,
    );
  }

  public async down(): Promise<void> {
    console.log('done');
  }
}
