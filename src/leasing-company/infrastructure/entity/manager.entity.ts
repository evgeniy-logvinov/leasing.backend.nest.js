import { Entity, ManyToOne } from 'typeorm';
import { CityManager } from './city-manager.entity';
import { Employee } from './employee.entity';

@Entity()
export class Manager extends Employee {
  @ManyToOne(() => CityManager, (item) => item.manager)
  cityManager: CityManager;
}
