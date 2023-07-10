import {
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnaliticsDepartment } from './analitics-department.entity';
import { SalesDepartment } from './sales-department.entity';

@Entity()
export class Infrastructure {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @OneToOne(() => AnaliticsDepartment)
  @JoinColumn()
  analiticsDepartment: AnaliticsDepartment;

  @OneToOne(() => SalesDepartment)
  @JoinColumn()
  salesDepartment: SalesDepartment;
}
