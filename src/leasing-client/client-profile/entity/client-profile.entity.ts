import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { ClientStateEnum } from 'src/user/enum/ClientStateEnum';
import { Column, Entity } from 'typeorm';

@Entity()
export class ClientProfile extends LeasingEntity {
  @Column()
  fullName: string;

  @Column({ nullable: true })
  shortName: string;

  @Column({
    type: 'enum',
    enum: ClientStateEnum,
    default: ClientStateEnum.UNREG,
  })
  state: ClientStateEnum;

  @Column()
  inn: string;
}
