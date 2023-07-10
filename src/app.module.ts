import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyProfileModule } from './leasing-company/company-profile/company-profile.module';
import { CompanyProfile } from './leasing-company/company-profile/entity/company-profile.entity';
import { LeasingCompany } from './leasing-company/entity/leasing-company.entity';
import { Analitic } from './leasing-company/infrastructure/entity/analitic.entity';
import { AnaliticsDepartment } from './leasing-company/infrastructure/entity/analitics-department.entity';
import { CityManager } from './leasing-company/infrastructure/entity/city-manager.entity';
import { Employee } from './leasing-company/infrastructure/entity/employee.entity';
import { Infrastructure } from './leasing-company/infrastructure/entity/infrustructure.entity';
import { Manager } from './leasing-company/infrastructure/entity/manager.entity';
import { SalesDepartment } from './leasing-company/infrastructure/entity/sales-department.entity';
import { InfrastructureModule } from './leasing-company/infrastructure/infrastructure.module';
import { LeasingCompanyModule } from './leasing-company/leasing-company.module';
import { CityOfPresenceCustomerCoverageArea } from './leasing-company/preference-filter/entity/city-of-presence-customer-coverage-area.entity';
import { City } from './leasing-company/preference-filter/entity/city.entity';
import { CriteriaFinancedHolding } from './leasing-company/preference-filter/entity/criteria-financed-holding.entity';
import { Gk } from './leasing-company/preference-filter/entity/gk.entity';
import { Ip } from './leasing-company/preference-filter/entity/ip.entity';
import { Legal } from './leasing-company/preference-filter/entity/legal.entity';
import { PreferenceFilter } from './leasing-company/preference-filter/entity/preference-filter.entity';
import { SubCompany } from './leasing-company/preference-filter/entity/sub-company.entity';
import { SubjectGuarantee } from './leasing-company/preference-filter/entity/subject-guarantee';
import { TypesOfFinancedHolding } from './leasing-company/preference-filter/entity/types-of-financed-holding.entity';
import { PreferenceFilterModule } from './leasing-company/preference-filter/preference-filter.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'mysql'>('DB_TYPE'),
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        charset: config.get<string>('DB_CHARSET'),
        entities: [
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
          Infrastructure,
          AnaliticsDepartment,
          Employee,
          Analitic,
          SalesDepartment,
          CityManager,
          Manager,
          CompanyProfile,
          LeasingCompany,
        ],
        // TODO: read about this and check
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    PreferenceFilterModule,
    InfrastructureModule,
    CompanyProfileModule,
    LeasingCompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
