import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { CriteriaFinancedHolding } from './criteria-financed-holding.entity';
import { PreferenceFilter } from './preference-filter.entity';

@Entity()
export class TypesOfFinancedHolding extends LeasingEntity {
  @Column()
  name: string;

  @Column({ default: false })
  selected: boolean;

  @OneToOne(() => CriteriaFinancedHolding)
  @JoinColumn()
  newCriteria: CriteriaFinancedHolding;

  @OneToOne(() => CriteriaFinancedHolding)
  @JoinColumn()
  previouslyUsedCriteria: CriteriaFinancedHolding;

  @OneToOne(() => CriteriaFinancedHolding)
  @JoinColumn()
  returnableCriteria: CriteriaFinancedHolding;

  @ManyToOne(() => PreferenceFilter, (item) => item.typesOfFinancedHoldings)
  preferenceFilter: PreferenceFilter;
}
