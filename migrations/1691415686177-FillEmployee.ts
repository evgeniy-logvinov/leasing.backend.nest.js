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

export class FillEmployee1691415686177 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const employees: EmployeeSql[] = [
      {
        id: uuidv4(),
        firstName: 'Head Of Analitics department',
        lastName: 'Connor',
        patronymic: 'Jon',
        email: UserEmails.COMPANY_HEAD_OF_ANALITIS,
        phone: '+12312312321',
        mobilePhone: '+12312313213',
        isOnline: 1,
      },
      {
        id: uuidv4(),
        firstName: 'Head Of Sales department',
        lastName: 'Connor',
        patronymic: 'Ally',
        email: UserEmails.COMPANY_HEAD_OF_SALES,
        phone: '+12312312322',
        mobilePhone: '+12312313214',
        isOnline: 1,
      },
      {
        id: uuidv4(),
        firstName: 'Sales',
        lastName: 'Connor',
        patronymic: 'Jilly',
        email: UserEmails.COMPANY_SALES,
        phone: '+12312312324',
        mobilePhone: '+12312313216',
        isOnline: 1,
      },
      {
        id: uuidv4(),
        firstName: 'Manager',
        lastName: 'Connor',
        patronymic: 'David',
        email: UserEmails.COMPANY_REGION_MANAGER,
        phone: '+12312312325',
        mobilePhone: '+12312313217',
        isOnline: 1,
      },
    ];
    employees.forEach((employee) => {
      queryRunner.query(
        `INSERT INTO employee (firstName, 
            lastName, 
            patronymic, 
            phone, 
            mobilePhone, 
            isOnline,
            userId,
            id)
        SELECT '${employee.firstName}',
            '${employee.lastName}',
            '${employee.patronymic}',
            '${employee.phone}',
            '${employee.mobilePhone}',
            ${employee.isOnline},
            user.id,
            '${employee.id}'
        FROM user
        WHERE user.email = '${employee.email}';`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
