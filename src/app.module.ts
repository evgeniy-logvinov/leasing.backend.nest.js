import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityOfPresenceCustomerCoverageArea } from './preference-filter/entity/city-of-presence-customer-coverage-area.entity';
import { City } from './preference-filter/entity/city.entity';
import { CriteriaFinancedHolding } from './preference-filter/entity/criteria-financed-holding.entity';
import { Gk } from './preference-filter/entity/gk.entity';
import { PreferenceFilter } from './preference-filter/entity/preference-filter.entity';
import { SubCompany } from './preference-filter/entity/sub-company.entity';
import { TypesOfFinancedHolding } from './preference-filter/entity/types-of-financed-holding.entity';
import { PreferenceFilterModule } from './preference-filter/preference-filter.module';

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
        ],
        // TODO: read about this and check
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    PreferenceFilterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
