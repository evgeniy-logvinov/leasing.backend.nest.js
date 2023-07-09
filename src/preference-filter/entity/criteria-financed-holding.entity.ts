import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ip } from './ip.entity';
import { Legal } from './legal.entity';

@Entity()
export class CriteriaFinancedHolding {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column()
  maxCountOfMonth: number;

  @OneToOne(() => Ip)
  @JoinColumn()
  ip: Ip;

  @OneToOne(() => Legal)
  @JoinColumn()
  legal: Legal;
}
