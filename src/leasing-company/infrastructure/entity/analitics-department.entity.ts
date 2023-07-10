import {
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Analitic } from './analitic.entity';
import { Employee } from './employee.entity';

@Entity()
export class AnaliticsDepartment {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @OneToOne(() => Employee)
  @JoinColumn()
  head: Employee;

  @OneToMany(() => Analitic, (item) => item.analiticsDepartment)
  analitics: Analitic[];
}
