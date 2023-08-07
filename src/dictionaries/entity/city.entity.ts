import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { CityOfPresenceCustomerCoverageArea } from 'src/leasing-company/preference-filter/entity/city-of-presence-customer-coverage-area.entity';
import { PreferenceFilter } from 'src/leasing-company/preference-filter/entity/preference-filter.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { District } from './district.entity';

@Entity()
export class City extends LeasingEntity {
  @Column()
  name: string;

  @ManyToOne(() => District, (item) => item.cities)
  district: District;

  @ManyToMany(
    () => CityOfPresenceCustomerCoverageArea,
    (cityOfPresenceCustomerCoverageArea) =>
      cityOfPresenceCustomerCoverageArea.сustomerCoverageAreas,
    {
      cascade: true,
    },
  )
  cityOfPresenceCustomerCoverageAreas: CityOfPresenceCustomerCoverageArea[];
}
