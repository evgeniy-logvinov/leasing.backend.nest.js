import { Module } from '@nestjs/common';
import { PreferenceFilterService } from './preference-filter.service';
import { PreferenceFilterController } from './preference-filter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreferenceFilter } from './entity/preference-filter.entity';
import { CityOfPresenceCustomerCoverageArea } from './entity/city-of-presence-customer-coverage-area.entity';
import { City } from './entity/city.entity';
import { SubCompany } from './entity/sub-company.entity';
import { TypesOfFinancedHolding } from './entity/types-of-financed-holding.entity';
import { Gk } from './entity/gk.entity';
import { CriteriaFinancedHolding } from './entity/criteria-financed-holding.entity';
import { SubjectGuarantee } from './entity/subject-guarantee';
import { Legal } from './entity/legal.entity';
import { Ip } from './entity/ip.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PreferenceFilter,
      CityOfPresenceCustomerCoverageArea,
      City,
      SubCompany,
      TypesOfFinancedHolding,
      Gk,
      CriteriaFinancedHolding,
      SubjectGuarantee,
      Ip,
      Legal,
    ]),
  ],
  providers: [PreferenceFilterService],
  controllers: [PreferenceFilterController],
})
export class PreferenceFilterModule {}
