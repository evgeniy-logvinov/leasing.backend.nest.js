import { Entity, ManyToOne } from 'typeorm';
import { AnaliticsDepartment } from './analitics-department.entity';
import { Employee } from './employee.entity';

@Entity()
export class Analitic extends Employee {
  @ManyToOne(() => AnaliticsDepartment, (item) => item.analitics)
  analiticsDepartment: AnaliticsDepartment;
}
