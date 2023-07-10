import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CriteriaFinancedHolding } from './criteria-financed-holding.entity';
import { PreferenceFilter } from './preference-filter.entity';

@Entity()
export class TypesOfFinancedHolding {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

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
