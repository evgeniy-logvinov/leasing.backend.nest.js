import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { District } from './district.entity';

@Entity()
export class City extends LeasingEntity {
  @Column()
  name: string;

  @ManyToOne(() => District, (item) => item.cities)
  district: District;
}
