import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Analitic } from './analitic.entity';
import { Employee } from './employee.entity';

@Entity()
export class AnaliticsDepartment extends LeasingEntity {
  @OneToOne(() => Employee)
  @JoinColumn()
  head: Employee;

  @OneToMany(() => Analitic, (item) => item.analiticsDepartment)
  analitics: Analitic[];
}
