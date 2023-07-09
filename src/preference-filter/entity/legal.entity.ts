import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './city.entity';
import { SubCompany } from './sub-company.entity';

@Entity()
export class Legal {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column()
  gk: boolean;

  @ManyToOne(() => SubCompany)
  @JoinColumn()
  subCompanies: SubCompany;
}
