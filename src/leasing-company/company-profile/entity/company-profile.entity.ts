import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class CompanyProfile extends LeasingEntity {
  @Column()
  fullName: string;

  @Column({ nullable: true })
  shortName: string;

  @Column()
  accreditation: boolean;

  @Column({ default: 'some link' })
  agreement: string;

  @Column()
  inn: string;
}
