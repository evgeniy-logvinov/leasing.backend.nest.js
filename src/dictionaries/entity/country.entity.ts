import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Area } from './area.entity';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Area, (item) => item.country)
  area: Area[];
}
