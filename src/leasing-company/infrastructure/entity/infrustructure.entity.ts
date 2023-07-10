import {
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnaliticsDepartment } from './analitics-department.entity';

@Entity()
export class Infrastructure {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @OneToOne(() => AnaliticsDepartment)
  @JoinColumn()
  analiticsDepartment: AnaliticsDepartment;
}
