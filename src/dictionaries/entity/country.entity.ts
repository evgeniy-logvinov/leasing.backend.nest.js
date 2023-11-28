import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Area } from './area.entity';

@Entity()
export class Country extends LeasingEntity {
  @Column()
  name: string;

  @OneToMany(() => Area, (item) => item.country)
  children: Area[];
}
