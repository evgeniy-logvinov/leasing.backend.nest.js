import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { CompanyStateEnum } from 'src/user/enum/CompanyStateEnum';
import { Column, Entity } from 'typeorm';

@Entity()
export class CompanyProfile extends LeasingEntity {
  @Column()
  fullName: string;

  @Column({ nullable: true })
  shortName: string;

  @Column({
    type: 'enum',
    enum: CompanyStateEnum,
    default: CompanyStateEnum.UNREG,
  })
  state: CompanyStateEnum;

  @Column()
  accreditation: boolean;

  @Column({ default: 'some link' })
  agreement: string;

  @Column()
  inn: string;
}
