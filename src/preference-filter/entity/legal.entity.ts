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
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  gk: boolean;

  @ManyToOne(() => SubCompany)
  @JoinColumn()
  subCompanies: SubCompany;
}
