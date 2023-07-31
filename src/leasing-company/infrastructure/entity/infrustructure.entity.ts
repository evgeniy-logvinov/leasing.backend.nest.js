import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { AnaliticsDepartment } from './analitics-department.entity';
import { SalesDepartment } from './sales-department.entity';

@Entity()
export class Infrastructure extends LeasingEntity {
  @OneToOne(() => AnaliticsDepartment)
  @JoinColumn()
  analiticsDepartment: AnaliticsDepartment;

  @OneToOne(() => SalesDepartment)
  @JoinColumn()
  salesDepartment: SalesDepartment;
}
