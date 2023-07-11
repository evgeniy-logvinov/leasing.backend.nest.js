import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Application } from './leasing-client/application/entity/application.entity';
import { ClientProfile } from './leasing-client/client-profile/entity/client-profile.entity';
import { LeasingClient } from './leasing-client/entity/leasing-client.entity';
import { CommercialProposal } from './leasing-company/commercial-proposal/entity/commercial-proposal.entity';
import { CompanyProfile } from './leasing-company/company-profile/entity/company-profile.entity';
import { LeasingCompany } from './leasing-company/entity/leasing-company.entity';
import { Analitic } from './leasing-company/infrastructure/entity/analitic.entity';
import { AnaliticsDepartment } from './leasing-company/infrastructure/entity/analitics-department.entity';
import { CityManager } from './leasing-company/infrastructure/entity/city-manager.entity';
import { Employee } from './leasing-company/infrastructure/entity/employee.entity';
import { Infrastructure } from './leasing-company/infrastructure/entity/infrustructure.entity';
import { Manager } from './leasing-company/infrastructure/entity/manager.entity';
import { SalesDepartment } from './leasing-company/infrastructure/entity/sales-department.entity';
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
import { User } from './user/entity/user.entity';
import { Permission } from './user/permission/entity/permission.entity';
import { Role } from './user/role/entity/role.entity';

export const options: TypeOrmModuleAsyncOptions = {
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
      LeasingClient,
      ClientProfile,
      Application,
      CommercialProposal,
      Role,
      User,
      Permission,
    ],
    autoLoadEntities: true,
    synchronize: true,
  }),
  inject: [ConfigService],
};
