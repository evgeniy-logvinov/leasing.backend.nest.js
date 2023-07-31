import { MigrationInterface, QueryRunner } from 'typeorm';
import { OneToOne } from './interfaces';
import { v4 as uuidv4 } from 'uuid';
import { CitiesEnum, DistrictsEnum } from './constants';

export class FillCities1690575369140 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const cities: OneToOne[] = [
      {
        select: CitiesEnum.CHEBARKUL,
        where: DistrictsEnum.DISTRICT_74,
      },
      {
        select: CitiesEnum.CHELYABINKS,
        where: DistrictsEnum.DISTRICT_74,
      },
      {
        select: CitiesEnum.EKATERINGBURG,
        where: DistrictsEnum.DISTRICT_96,
      },
    ];
    cities.forEach((city) => {
      queryRunner.query(
        `INSERT INTO city (districtId, name, id)
              SELECT id, '${city.select}', '${uuidv4()}'
              FROM district
              WHERE district.name = '${city.where}'`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
