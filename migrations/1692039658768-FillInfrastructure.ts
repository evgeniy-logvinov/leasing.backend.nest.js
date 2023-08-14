import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class FillInfrastructure1692039658768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `INSERT INTO infrastructure (
            analiticsDepartmentId,
            salesDepartmentId,
            id
        )
        SELECT analitics_department.id,
              sales_department.id,
              '${uuidv4()}'
        FROM analitics_department, sales_department
        LIMIT 1`,
    );
  }

  public async down(): Promise<void> {
    console.log('done');
  }
}
