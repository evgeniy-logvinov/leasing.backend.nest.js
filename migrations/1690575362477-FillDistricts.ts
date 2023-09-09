import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { DistrictsEnum } from './constants';
import { OneToOne } from './interfaces';

export class FillDistricts1690575362477 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const districts: OneToOne[] = [
      {
        select: DistrictsEnum.DISTRICT_74,
        where: 'Уральский федеральный округ',
      },
      {
        select: DistrictsEnum.DISTRICT_96,
        where: 'Уральский федеральный округ',
      },
      {
        select: DistrictsEnum.DISTRICT_77,
        where: 'Центральный федеральный округ',
      },
    ];
    districts.forEach((district) => {
      queryRunner.query(
        `INSERT INTO district (areaId, name, id)
            SELECT id, '${district.select}', '${uuidv4()}'
            FROM area
            WHERE area.name = '${district.where}'`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
