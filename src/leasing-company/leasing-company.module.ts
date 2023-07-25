import { Module } from '@nestjs/common';
import { LeasingCompanyService } from './leasing-company.service';
import { LeasingCompanyController } from './leasing-company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeasingCompany } from './entity/leasing-company.entity';
import { CompanyProfile } from './company-profile/entity/company-profile.entity';
import { User } from 'src/user/entity/user.entity';
import { Role } from 'src/user/role/entity/role.entity';
import { RoleService } from 'src/user/role/role.service';
import { Infrastructure } from './infrastructure/entity/infrustructure.entity';
import { PreferenceFilter } from './preference-filter/entity/preference-filter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LeasingCompany,
      CompanyProfile,
      User,
      Role,
      Infrastructure,
      PreferenceFilter,
    ]),
  ],
  providers: [LeasingCompanyService, RoleService],
  controllers: [LeasingCompanyController],
})
export class LeasingCompanyModule {}
