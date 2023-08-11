import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserEmails } from './constants';

interface EmployeeSql {
  id: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: UserEmails;
  phone: string;
  mobilePhone: string;
  isOnline: number;
}

export class FillAnalitic1691415686179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const employees: EmployeeSql[] = [
      {
        id: uuidv4(),
        firstName: 'Analitic',
        lastName: 'Andrey',
        patronymic: 'Ally',
        email: UserEmails.COMPANY_ANALITIC,
        phone: '+12312312323',
        mobilePhone: '+12312313215',
        isOnline: 1,
      },
    ];
    employees.forEach((employee) => {
      queryRunner.query(
        `INSERT INTO analitic (firstName, 
            lastName, 
            patronymic, 
            phone, 
            mobilePhone, 
            isOnline,
            userId,
            analiticsDepartmentId,
            id)
        SELECT '${employee.firstName}',
            '${employee.lastName}',
            '${employee.patronymic}',
            '${employee.phone}',
            '${employee.mobilePhone}',
            ${employee.isOnline},
            user.id,
            analitics_department.id,
            '${employee.id}'
        FROM user, analitics_department
        WHERE user.email = '${employee.email}'
        LIMIT 1;`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
