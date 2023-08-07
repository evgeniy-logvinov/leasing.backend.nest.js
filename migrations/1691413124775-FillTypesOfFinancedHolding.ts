import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

interface TypesOfFinancedHoldingSql {
  id: string;
  name: string;
  selected: number;
}

export class FillTypesOfFinancedHolding1691413124775
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const types: TypesOfFinancedHoldingSql[] = [
      {
        id: uuidv4(),
        name: 'Car',
        selected: 1,
      },
      {
        id: uuidv4(),
        name: 'Ship',
        selected: 2,
      },
      {
        id: uuidv4(),
        name: 'Aircraft',
        selected: 3,
      },
    ];
    types.forEach((type) => {
      queryRunner.query(
        `INSERT INTO types_of_financed_holding (
            name, 
            selected, 
            newCriteriaId, 
            previouslyUsedCriteriaId, 
            returnableCriteriaId, 
            preferenceFilterId, 
            id
        )
        SELECT '${type.name}', ${type.selected}, t1.id, t2.id, t3.id, preference_filter.id, '${type.id}'
        FROM criteria_financed_holding t1, criteria_financed_holding t2, criteria_financed_holding t3, preference_filter
        WHERE
        NOT EXISTS (
            SELECT 1
            FROM types_of_financed_holding t4
            WHERE t4.newCriteriaId = t1.id
            OR t4.previouslyUsedCriteriaId = t2.id
            OR t4.returnableCriteriaId = t3.id
        )
        LIMIT 1;`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
