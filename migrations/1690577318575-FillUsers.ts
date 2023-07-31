import { RoleEnum } from 'src/user/enum/RoleEnum';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UserEmails } from './constants';

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
        email: UserEmails.ADMIN_CONFIRMED,
        isEmailConfirmed: 1,
      },
      {
        role: RoleEnum.ROLE_ADMIN,
        email: UserEmails.ADMIN_NOT_CONFIRMED,
        isEmailConfirmed: 0,
      },
      {
        role: RoleEnum.ROLE_LEASING_CLIENT,
        email: UserEmails.CLIENT_EMPTY,
        isEmailConfirmed: 1,
      },
      {
        role: RoleEnum.ROLE_LEASING_CLIENT,
        email: UserEmails.CLIENT_FILLED,
        isEmailConfirmed: 1,
      },
      {
        role: RoleEnum.ROLE_LEASING_COMPANY,
        email: UserEmails.COMPANY_EMPTY,
        isEmailConfirmed: 1,
      },
      {
        role: RoleEnum.ROLE_LEASING_COMPANY,
        email: UserEmails.COMPANY_FILLED,
        isEmailConfirmed: 1,
      },
      {
        role: RoleEnum.ROLE_LEASING_COMPANY_HEAD_OF_SALES,
        email: UserEmails.COMPANY_HEAD_OF_SALES,
        isEmailConfirmed: 1,
      },
      {
        role: RoleEnum.ROLE_LEASING_COMPANY_HEAD_OF_ANALITICS,
        email: UserEmails.COMPANY_HEAD_OF_ANALITIS,
        isEmailConfirmed: 1,
      },
      {
        role: RoleEnum.ROLE_LEASING_COMPANY_ANALITIC,
        email: UserEmails.COMPANY_ANALITIC,
        isEmailConfirmed: 1,
      },
      {
        role: RoleEnum.ROLE_LEASING_COMPANY_REGION_MANAGER,
        email: UserEmails.COMPANY_REGION_MANAGER,
        isEmailConfirmed: 1,
      },
      {
        role: RoleEnum.ROLE_LEASING_COMPANY_SALES,
        email: UserEmails.COMPANY_SALES,
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
