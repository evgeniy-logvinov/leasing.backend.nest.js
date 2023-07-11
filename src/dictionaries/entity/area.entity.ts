import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from './country.entity';
import { District } from './district.entity';

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Country, (item) => item.area)
  country: Country;

  @OneToMany(() => District, (item) => item.area)
  district: District[];
}
