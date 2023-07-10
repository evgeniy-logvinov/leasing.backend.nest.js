import {
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

  @OneToOne(() => ClientProfile)
  @JoinColumn()
  clientProfile: ClientProfile;

  @OneToMany(() => Application, (item) => item.client)
  applications: Application[];
}
