import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Country } from './country.entity';
import { District } from './district.entity';

@Entity()
export class Area extends LeasingEntity {
  @Column()
  name: string;

  @ManyToOne(() => Country, (item) => item.area)
  country: Country;

  @OneToMany(() => District, (item) => item.area)
  district: District[];
}
