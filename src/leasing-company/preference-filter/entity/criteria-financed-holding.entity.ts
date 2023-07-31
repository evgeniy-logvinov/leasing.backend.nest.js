import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Ip } from './ip.entity';
import { Legal } from './legal.entity';

@Entity()
export class CriteriaFinancedHolding extends LeasingEntity {
  @Column()
  maxCountOfMonth: number;

  @OneToOne(() => Ip)
  @JoinColumn()
  ip: Ip;

  @OneToOne(() => Legal)
  @JoinColumn()
  legal: Legal;
}
