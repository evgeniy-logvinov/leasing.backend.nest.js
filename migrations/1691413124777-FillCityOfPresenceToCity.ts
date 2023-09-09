import { MigrationInterface, QueryRunner } from 'typeorm';
import { CitiesEnum } from './constants';
import { v4 as uuidv4 } from 'uuid';

interface CityToPresenceSql {
  city: CitiesEnum;
  coverageArea: CitiesEnum[];
}

export class FillCityOfPresenceToCity1691413124777
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const cityToPresences: CityToPresenceSql[] = [
      {
        coverageArea: [CitiesEnum.CHEBARKUL, CitiesEnum.MOSCOW],
        city: CitiesEnum.CHELYABINKS,
      },
      {
        city: CitiesEnum.EKATERINGBURG,
        coverageArea: [CitiesEnum.EKATERINGBURG, CitiesEnum.CHELYABINKS],
      },
    ];
    cityToPresences.forEach((cityToPresence) => {
      queryRunner.query(
        `
            INSERT INTO cit_of_pre_cus_cov_are_сus_cov_are_cit (
              cityOfPresenceCustomerCoverageAreaId,
              cityId
            )
            SELECT city_of_presence_customer_coverage_area.id,
              city.id
            FROM city_of_presence_customer_coverage_area, city
            WHERE city.name in (${cityToPresence.coverageArea
              .map((item) => `'${item}'`)
              .join(', ')}
            )
            AND city_of_presence_customer_coverage_area.id in (
              SELECT id
              FROM city
              WHERE city.name = '${cityToPresence.city}'
            );`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
