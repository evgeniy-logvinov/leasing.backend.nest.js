import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class SubjectGuarantee extends LeasingEntity {
  @Column()
  yes: boolean;

  @Column()
  affilatedCompanies: boolean;

  @Column()
  anySubject: boolean;
}
