import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { District } from './district.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => District, (item) => item.cities)
  district: District;
}
