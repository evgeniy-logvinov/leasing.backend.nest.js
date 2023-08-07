import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

interface CriteriaFinancedHoldingSql {
  id: string;
  maxCountOfMonth: number;
}
export class FillCriteriaFinancedHolding1691183602752
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const criteries: CriteriaFinancedHoldingSql[] = [
      {
        id: uuidv4(),
        maxCountOfMonth: 1000,
      },
      {
        id: uuidv4(),
        maxCountOfMonth: 2000,
      },
      {
        id: uuidv4(),
        maxCountOfMonth: 3000,
      },
    ];
    criteries.forEach((criteria) => {
      queryRunner.query(
        `INSERT INTO criteria_financed_holding (
            maxCountOfMonth, 
            ipId, 
            legalId, 
            id
        )
        SELECT ${criteria.maxCountOfMonth}, t1.id, t2.id, '${criteria.id}'
        FROM ip t1, legal t2
        WHERE NOT EXISTS (
            SELECT 1
            FROM criteria_financed_holding t3 
            WHERE t3.ipId = t1.id)
          AND NOT EXISTS (
            SELECT 1
            FROM criteria_financed_holding t3
            WHERE t3.legalId = t2.id)
        LIMIT 1;`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
