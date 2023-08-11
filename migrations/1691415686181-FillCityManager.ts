import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserEmails } from './constants';

interface SalesDepartmentSql {
  id: string;
  email: string;
}

export class FillCityManager1691415686181 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const salesDepartment: SalesDepartmentSql[] = [
      {
        id: uuidv4(),
        email: UserEmails.COMPANY_REGION_MANAGER,
      },
    ];
    salesDepartment.forEach((department) => {
      queryRunner.query(
        `INSERT INTO city_manager (
            headId,
            salesDepartmentId,
            id)
        SELECT employee.id,
               sales_department.id,
              '${department.id}'
        FROM user, employee, sales_department
        WHERE user.email = '${department.email}'
        AND employee.userId = user.id;`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
