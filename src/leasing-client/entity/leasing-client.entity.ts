import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Application } from '../application/entity/application.entity';
import { ClientProfile } from '../client-profile/entity/client-profile.entity';

@Entity()
export class LeasingClient {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => ClientProfile)
  @JoinColumn()
  clientProfile: ClientProfile;

  @Column({ default: '' })
  description: string;

  @Column({ nullable: true, select: false })
  inviteId: string;

  @OneToMany(() => Application, (item) => item.client)
  applications: Application[];
}
