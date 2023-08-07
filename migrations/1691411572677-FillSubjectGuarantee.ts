import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

interface SubjectGuaranteeSql {
  id: string;
  yes: number;
  affilatedCompanies: number;
  anySubject: number;
}

export class FillSubjectGuarantee1691411572677 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const subjectGuarantees: SubjectGuaranteeSql[] = [
      {
        id: uuidv4(),
        yes: 1,
        affilatedCompanies: 1,
        anySubject: 1,
      },
      {
        id: uuidv4(),
        yes: 2,
        affilatedCompanies: 3,
        anySubject: 1,
      },
    ];
    subjectGuarantees.forEach((subjectGuarantee) => {
      queryRunner.query(
        `INSERT INTO subject_guarantee (yes, affilatedCompanies, anySubject, id)
            VALUES (${subjectGuarantee.yes}, ${subjectGuarantee.affilatedCompanies}, ${subjectGuarantee.anySubject}, '${subjectGuarantee.id}')`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
