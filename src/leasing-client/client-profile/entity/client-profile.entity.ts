import { ClientStateEnum } from 'src/user/enum/ClientStateEnum';
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClientProfile {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

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
