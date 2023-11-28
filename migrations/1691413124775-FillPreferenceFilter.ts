import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

interface PreferenceFilterSql {
  id: string;
}

export class FillPreferenceFilter1691413124775 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const filters: PreferenceFilterSql[] = [
      {
        id: uuidv4(),
      },
      // {
      //   id: uuidv4(),
      // },
    ];
    filters.forEach((filter) => {
      queryRunner.query(
        `INSERT INTO preference_filter (
                gkId,
                subjectGuaranteeId,
                id
            )
            SELECT gk.id, subject_guarantee.id, '${filter.id}'
            FROM gk, subject_guarantee
            WHERE NOT EXISTS (
                SELECT 1
                FROM preference_filter t3 
                WHERE t3.gkId = gk.id)
            AND NOT EXISTS (
                SELECT 1
                FROM preference_filter t4
                WHERE t4.subjectGuaranteeId = subject_guarantee.id)
            LIMIT 1;`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
