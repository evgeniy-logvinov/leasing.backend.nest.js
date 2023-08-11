import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserEmails } from './constants';

interface SalesDepartmentSql {
  id: string;
  email: string;
}

export class FillSalesDepartment1691415686180 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const salesDepartment: SalesDepartmentSql[] = [
      {
        id: uuidv4(),
        email: UserEmails.COMPANY_HEAD_OF_SALES,
      },
    ];
    salesDepartment.forEach((department) => {
      queryRunner.query(
        `INSERT INTO sales_department (
            headId,
            id)
        SELECT employee.id,
            '${department.id}'
        FROM user, employee
        WHERE user.email = '${department.email}'
        AND employee.userId = user.id;`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
