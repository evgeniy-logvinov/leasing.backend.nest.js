import { City } from 'src/dictionaries/entity/city.entity';
import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { PreferenceFilter } from './preference-filter.entity';

@Entity()
export class CityOfPresenceCustomerCoverageArea extends LeasingEntity {
  @OneToOne(() => City)
  @JoinColumn()
  city: City;

  @ManyToMany(() => City, (city) => city.id)
  @JoinTable()
  сustomerCoverageAreas: City[];

  @Column()
  zato: boolean;

  @ManyToOne(
    () => PreferenceFilter,
    (item) => item.cityOfPresenceCustomerCoverageArea,
  )
  preferenceFilter: PreferenceFilter;
}
