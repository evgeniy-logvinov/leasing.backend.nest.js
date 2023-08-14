import { Module } from '@nestjs/common';
import { CompanyProfileService } from './company-profile.service';
import { CompanyProfileController } from './company-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyProfile } from './entity/company-profile.entity';
import { LeasingCompany } from '../entity/leasing-company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyProfile, LeasingCompany])],
  providers: [CompanyProfileService],
  controllers: [CompanyProfileController],
})
export class CompanyProfileModule {}
