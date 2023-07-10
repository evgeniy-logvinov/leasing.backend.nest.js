import {
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

  @OneToOne(() => PreferenceFilter)
  @JoinColumn()
  preferenceFilter: PreferenceFilter;

  @OneToOne(() => Infrastructure)
  @JoinColumn()
  infrastructure: Infrastructure;

  @OneToOne(() => Infrastructure)
  @JoinColumn()
  companyProfile: CompanyProfile;
}
