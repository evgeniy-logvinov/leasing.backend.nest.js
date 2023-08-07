import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

interface SubCompaniesSql {
  id: string;
  accreditation: number;
  name: string;
}

export class FillSubCompanies1691410997113 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const subCompanies: SubCompaniesSql[] = [
      {
        id: uuidv4(),
        accreditation: 1,
        name: 'SubCompany1',
      },
      {
        id: uuidv4(),
        accreditation: 0,
        name: 'SubCompany2',
      },
    ];
    subCompanies.forEach((subCompany) => {
      queryRunner.query(
        `INSERT INTO sub_company (
            accreditation, 
            name,
            gkId,
            id
        )
        SELECT ${subCompany.accreditation}, '${subCompany.name}', gk.id, '${subCompany.id}'
        FROM gk
        LIMIT 1;`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
