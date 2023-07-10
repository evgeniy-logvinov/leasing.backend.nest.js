import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubCompany } from './sub-company.entity';

@Entity()
export class Gk {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column()
  gk: boolean;

  @OneToMany(() => SubCompany, (item) => item.gk)
  subCompanies: SubCompany[];
}
