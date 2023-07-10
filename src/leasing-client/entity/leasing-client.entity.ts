import {
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientProfile } from '../client-profile/entity/client-profile.entity';

@Entity()
export class LeasingClient {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @OneToOne(() => ClientProfile)
  @JoinColumn()
  clientProfile: ClientProfile;
}
