import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CountriesEnum } from './constants';

export class FillCountries1690575123670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const countries = [CountriesEnum.RUSSIA];
    countries.forEach((country) => {
      queryRunner.query(
        `INSERT INTO country (name, id) VALUES ('${country}', '${uuidv4()}')`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
