import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AreasEnum, CountriesEnum } from './constants';
import { OneToOne } from './interfaces';

export class FillAreas1690575352644 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const areas: OneToOne[] = [
      {
        select: AreasEnum.UFO,
        where: CountriesEnum.RUSSIA,
      },
    ];
    areas.forEach((area) => {
      queryRunner.query(
        `
        INSERT INTO area (countryId, name, id)
        SELECT id, '${area.select}', '${uuidv4()}'
        FROM country
        WHERE country.name = '${area.where}'`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
