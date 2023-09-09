import { MigrationInterface, QueryRunner } from 'typeorm';
import { CitiesEnum } from './constants';
import { v4 as uuidv4 } from 'uuid';

interface CityOfPresenceCustomerCoverageAreaSql {
  city: CitiesEnum;
  coverageArea: CitiesEnum[];
  zato: number;
  id: string;
}

export class FillCityOfPresence1691413124776 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const cityOfPresenceCustomerCoverageAreas: CityOfPresenceCustomerCoverageAreaSql[] =
      [
        {
          city: CitiesEnum.CHELYABINKS,
          coverageArea: [CitiesEnum.CHEBARKUL, CitiesEnum.MOSCOW],
          id: uuidv4(),
          zato: 0,
        },
        {
          city: CitiesEnum.EKATERINGBURG,
          coverageArea: [CitiesEnum.EKATERINGBURG, CitiesEnum.CHELYABINKS],
          id: uuidv4(),
          zato: 1,
        },
      ];
    cityOfPresenceCustomerCoverageAreas.forEach(
      (cityOfPresenceCustomerCoverageArea) => {
        queryRunner.query(
          `
            INSERT INTO city_of_presence_customer_coverage_area (
              preferenceFilterId,
              cityId,
              zato,
              id)
            SELECT preference_filter.id,
              city.id,
              ${cityOfPresenceCustomerCoverageArea.zato},
              '${cityOfPresenceCustomerCoverageArea.id}'
            FROM preference_filter, city
            WHERE city.name = '${cityOfPresenceCustomerCoverageArea.city}'
            LIMIT 1;`,
        );
      },
    );
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
