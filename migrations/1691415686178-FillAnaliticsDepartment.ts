import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserEmails } from './constants';

interface AnaliticsDepartmentSql {
  id: string;
  email: string;
}

export class FillAnaliticsDepartment1691415686178
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const analiticsDepartment: AnaliticsDepartmentSql[] = [
      {
        id: uuidv4(),
        email: UserEmails.COMPANY_HEAD_OF_ANALITIS,
      },
    ];
    analiticsDepartment.forEach((department) => {
      queryRunner.query(
        `INSERT INTO analitics_department (
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
