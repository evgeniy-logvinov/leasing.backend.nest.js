import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Area } from './area.entity';
import { City } from './city.entity';

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Area, (item) => item.district)
  area: Area;

  @OneToMany(() => City, (item) => item.district)
  cities: City[];
}
