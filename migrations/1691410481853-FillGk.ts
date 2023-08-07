import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

interface GkSql {
  id: string;
  gk: number;
}

export class FillGk1691410481853 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const gks: GkSql[] = [
      {
        id: uuidv4(),
        gk: 1,
      },
      {
        id: uuidv4(),
        gk: 0,
      },
    ];
    gks.forEach((gk) => {
      queryRunner.query(
        `INSERT INTO gk (gk, id)
        VALUES (${gk.gk}, '${gk.id}')`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
