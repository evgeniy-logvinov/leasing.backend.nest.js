import {
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CityOfPresenceCustomerCoverageArea } from './city-of-presence-customer-coverage-area.entity';
import { Gk } from './gk.entity';
import { SubjectGuarantee } from './subject-guarantee';
import { TypesOfFinancedHolding } from './types-of-financed-holding.entity';

@Entity()
export class PreferenceFilter {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @OneToMany(
    () => CityOfPresenceCustomerCoverageArea,
    (item) => item.preferenceFilter,
  )
  cityOfPresenceCustomerCoverageArea: CityOfPresenceCustomerCoverageArea[];

  @OneToOne(() => Gk)
  @JoinColumn()
  gk: Gk;

  @OneToMany(() => TypesOfFinancedHolding, (item) => item.preferenceFilter)
  typesOfFinancedHoldings: TypesOfFinancedHolding[];

  @OneToOne(() => SubjectGuarantee)
  @JoinColumn()
  subjectGuarantee: SubjectGuarantee;
}
