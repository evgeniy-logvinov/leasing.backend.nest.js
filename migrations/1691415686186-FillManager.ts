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

export class FillManager1691415686186 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const employees: EmployeeSql[] = [
      {
        id: uuidv4(),
        firstName: 'Manager',
        lastName: 'Connor',
        patronymic: 'David',
        email: UserEmails.COMPANY_SALES,
        phone: '+12312312325',
        mobilePhone: '+12312313217',
        isOnline: 1,
      },
    ];
    employees.forEach((employee) => {
      queryRunner.query(
        `INSERT INTO manager (firstName, 
            lastName, 
            patronymic, 
            phone, 
            mobilePhone, 
            isOnline,
            userId,
            cityManagerId,
            id)
        SELECT '${employee.firstName}',
            '${employee.lastName}',
            '${employee.patronymic}',
            '${employee.phone}',
            '${employee.mobilePhone}',
            ${employee.isOnline},
            user.id,
            city_manager.id,
            '${employee.id}'
        FROM user, city_manager
        WHERE user.email = '${employee.email}'
        LIMIT 1;`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
