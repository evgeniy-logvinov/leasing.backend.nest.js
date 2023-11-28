import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CitiesEnum, UserEmails } from './constants';

interface SalesDepartmentSql {
  id: string;
  email: string;
  city: string;
}

export class FillCityManager1691415686181 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const salesDepartment: SalesDepartmentSql[] = [
      {
        id: uuidv4(),
        email: UserEmails.COMPANY_REGION_MANAGER,
        city: CitiesEnum.CHELYABINKS,
      },
    ];
    salesDepartment.forEach((department) => {
      queryRunner.query(
        `INSERT INTO city_manager (
            headId,
            salesDepartmentId,
            cityId,
            id)
        SELECT employee.id,
               sales_department.id,
               city.id,
              '${department.id}'
        FROM user, employee, sales_department, city
        WHERE user.email = '${department.email}'
        AND employee.userId = user.id
        AND city.name = '${department.city}';`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
