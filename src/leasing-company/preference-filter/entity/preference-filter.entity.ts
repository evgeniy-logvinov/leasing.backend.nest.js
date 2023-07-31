import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CityOfPresenceCustomerCoverageArea } from './city-of-presence-customer-coverage-area.entity';
import { Gk } from './gk.entity';
import { SubjectGuarantee } from './subject-guarantee';
import { TypesOfFinancedHolding } from './types-of-financed-holding.entity';

@Entity()
export class PreferenceFilter extends LeasingEntity {
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
