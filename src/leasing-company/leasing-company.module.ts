import { Module } from '@nestjs/common';
import { LeasingCompanyService } from './leasing-company.service';
import { LeasingCompanyController } from './leasing-company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeasingCompany } from './entity/leasing-company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeasingCompany])],
  providers: [LeasingCompanyService],
  controllers: [LeasingCompanyController],
})
export class LeasingCompanyModule {}
