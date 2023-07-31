import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Area } from './area.entity';
import { City } from './city.entity';

@Entity()
export class District extends LeasingEntity {
  @Column()
  name: string;

  @ManyToOne(() => Area, (item) => item.district)
  area: Area;

  @OneToMany(() => City, (item) => item.district)
  cities: City[];
}
