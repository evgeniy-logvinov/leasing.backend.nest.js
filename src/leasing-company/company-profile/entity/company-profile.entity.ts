import { CompanyStateEnum } from 'src/user/enum/CompanyStateEnum';
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CompanyProfile {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

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
  inn: string;
}
