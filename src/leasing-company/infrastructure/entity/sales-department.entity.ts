import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CityManager } from './city-manager.entity';
import { Employee } from './employee.entity';

@Entity()
export class SalesDepartment extends LeasingEntity {
  @OneToOne(() => Employee)
  @JoinColumn()
  head: Employee;

  @OneToMany(() => CityManager, (item) => item.salesDepartment)
  cityManager: CityManager[];
}
