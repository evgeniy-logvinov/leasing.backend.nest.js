import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './city.entity';
import { SubCompany } from './sub-company.entity';

@Entity()
export class Gk {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column()
  gk: boolean;

  @OneToMany(() => SubCompany, (item) => item.gk)
  subCompanies: SubCompany;
}
