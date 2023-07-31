import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { SubCompany } from './sub-company.entity';

@Entity()
export class Gk extends LeasingEntity {
  @Column()
  gk: boolean;

  @OneToMany(() => SubCompany, (item) => item.gk)
  subCompanies: SubCompany[];
}
