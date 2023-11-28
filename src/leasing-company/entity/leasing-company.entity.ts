import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CompanyProfile } from '../company-profile/entity/company-profile.entity';
import { Employee } from '../infrastructure/entity/employee.entity';
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

  @OneToMany(() => Employee, (item) => item.company)
  employees: Employee[];
}
