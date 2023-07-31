import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CompanyProfile } from '../company-profile/entity/company-profile.entity';
import { Infrastructure } from '../infrastructure/entity/infrustructure.entity';
import { PreferenceFilter } from '../preference-filter/entity/preference-filter.entity';

@Entity()
export class LeasingCompany extends LeasingEntity {
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
