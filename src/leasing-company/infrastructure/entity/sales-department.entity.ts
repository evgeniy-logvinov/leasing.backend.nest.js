import {
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CityManager } from './city-manager.entity';
import { Employee } from './employee.entity';

@Entity()
export class SalesDepartment {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @OneToOne(() => Employee)
  @JoinColumn()
  head: Employee;

  @OneToMany(() => CityManager, (item) => item.salesDepartment)
  cityManager: CityManager[];
}
