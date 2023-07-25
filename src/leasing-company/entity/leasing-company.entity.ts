import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyProfile } from '../company-profile/entity/company-profile.entity';
import { Infrastructure } from '../infrastructure/entity/infrustructure.entity';
import { PreferenceFilter } from '../preference-filter/entity/preference-filter.entity';

@Entity()
export class LeasingCompany {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => PreferenceFilter)
  @JoinColumn()
  preferenceFilter: PreferenceFilter;

  @OneToOne(() => Infrastructure)
  @JoinColumn()
  infrastructure: Infrastructure;

  @OneToOne(() => CompanyProfile)
  @JoinColumn()
  companyProfile: CompanyProfile;

  @Column({ default: '' })
  description: string;

  @Column({ nullable: true, select: false })
  inviteId: string;
}
