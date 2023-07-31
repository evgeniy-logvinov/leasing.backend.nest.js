import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Application } from '../application/entity/application.entity';
import { ClientProfile } from '../client-profile/entity/client-profile.entity';

@Entity()
export class LeasingClient extends LeasingEntity {
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
