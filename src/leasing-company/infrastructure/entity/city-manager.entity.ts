import {
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from './employee.entity';
import { Manager } from './manager.entity';
import { SalesDepartment } from './sales-department.entity';

@Entity()
export class CityManager {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @ManyToOne(() => SalesDepartment, (item) => item.cityManager)
  salesDepartment: SalesDepartment;

  @OneToOne(() => Employee)
  @JoinColumn()
  head: Employee;

  @OneToMany(() => Manager, (item) => item.cityManager)
  manager: Manager[];
}
