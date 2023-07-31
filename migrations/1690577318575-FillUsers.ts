import { RoleEnum } from 'src/user/enum/RoleEnum';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

interface User {
  role: RoleEnum;
  email: string;
  isEmailConfirmed: number;
}

export class FillUsers1690577318575 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash('testPassword1', salt);

    const users: User[] = [
      {
        role: RoleEnum.ROLE_ADMIN,
        email: 'adminEmailConfirmed@gmail.com',
        isEmailConfirmed: 1,
      },
      {
        role: RoleEnum.ROLE_ADMIN,
        email: 'adminEmailNotConfirmed@gmail.com',
        isEmailConfirmed: 0,
      },
      {
        role: RoleEnum.ROLE_LEASING_CLIENT,
        email: 'clientUserEmail@gmail.com',
        isEmailConfirmed: 1,
      },
      {
        role: RoleEnum.ROLE_LEASING_CLIENT,
        email: 'clientUserFilledEmail@gmail.com',
        isEmailConfirmed: 1,
      },
      {
        role: RoleEnum.ROLE_LEASING_COMPANY,
        email: 'companyUserEmail@gmail.com',
        isEmailConfirmed: 1,
      },
      {
        role: RoleEnum.ROLE_LEASING_COMPANY_HEAD_OF_SALES,
        email: 'headOfSales@gmail.com',
        isEmailConfirmed: 1,
      },
      {
        role: RoleEnum.ROLE_LEASING_COMPANY_HEAD_OF_ANALITICS,
        email: 'headOfAnalitics@gmail.com',
        isEmailConfirmed: 1,
      },
      {
        role: RoleEnum.ROLE_LEASING_COMPANY_ANALITIC,
        email: 'companyAnalitic@gmail.com',
        isEmailConfirmed: 1,
      },
      {
        role: RoleEnum.ROLE_LEASING_COMPANY_REGION_MANAGER,
        email: 'companyRegionManager@gmail.com',
        isEmailConfirmed: 1,
      },
      {
        role: RoleEnum.ROLE_LEASING_COMPANY_SALES,
        email: 'companySales@gmail.com',
        isEmailConfirmed: 1,
      },
    ];
    users.forEach((user) => {
      queryRunner.query(
        `INSERT INTO user (roleId, email, isEmailConfirmed, password, salt, id)
            SELECT id, '${user.email}', '${
          user.isEmailConfirmed
        }', '${password}', '${salt}','${uuidv4()}'
            FROM role
            WHERE role.name = '${user.role}'`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
