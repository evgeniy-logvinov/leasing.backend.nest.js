import { City } from 'src/dictionaries/entity/city.entity';
import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Employee } from './employee.entity';
import { Manager } from './manager.entity';
import { SalesDepartment } from './sales-department.entity';

@Entity()
export class CityManager extends LeasingEntity {
  @ManyToOne(() => SalesDepartment, (item) => item.cityManager)
  salesDepartment: SalesDepartment;

  @OneToOne(() => Employee)
  @JoinColumn()
  head: Employee;

  @OneToOne(() => City)
  @JoinColumn()
  city: City;

  @OneToMany(() => Manager, (item) => item.cityManager)
  manager: Manager[];
}
