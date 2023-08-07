// import { CityOfPresenceCustomerCoverageArea } from 'src/leasing-company/preference-filter/entity/city-of-presence-customer-coverage-area.entity';
// import { PreferenceFilter } from 'src/leasing-company/preference-filter/entity/preference-filter.entity';
import { MigrationInterface } from 'typeorm';
// import { v4 as uuidv4 } from 'uuid';
// import { CitiesEnum } from './constants';

// interface CityOfPresenceCustomerCoverageAreaSql {
//   city: CitiesEnum;
//   coverageArea: CitiesEnum[];
//   zato: boolean;
//   id: string;
// }

export class FillCityOfPresence1691181043480 implements MigrationInterface {
  public async up(): Promise<void> {
    // const cityOfPresenceCustomerCoverageAreas: CityOfPresenceCustomerCoverageAreaSql[] =
    //   [
    //     {
    //       city: CitiesEnum.CHELYABINKS,
    //       coverageArea: [CitiesEnum.CHEBARKUL, CitiesEnum.MOSCOW],
    //       id: uuidv4(),
    //       zato: false,
    //     },
    //   ];
    // cityOfPresenceCustomerCoverageAreas.forEach(
    //   (cityOfPresenceCustomerCoverageArea) => {
    //     queryRunner.query(
    //       `INSERT INTO city_of_presence_customer_coverage_area (cityId, id)
    //                       SELECT id, '${application.isNew}', '${
    //         application.returnable
    //       }', '${application.subjectOfLeasing}', '${application.brand}', '${
    //         application.model
    //       }', '${application.country}', '${application.releaseDate}', '${
    //         application.typeOfSupplier
    //       }',
    //             '${uuidv4()}'
    //                       FROM leasing_client
    //                       WHERE leasing_client.description = '${
    //                         application.leasingClientDescription
    //                       }'`,
    //     );
    //   },
    // );
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
