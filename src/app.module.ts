import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DictionariesModule } from './dictionaries/dictionaries.module';
import { ApplicationModule } from './leasing-client/application/application.module';
import { ClientProfileModule } from './leasing-client/client-profile/client-profile.module';
import { LeasingClientModule } from './leasing-client/leasing-client.module';
import { CommercialProposalModule } from './leasing-company/commercial-proposal/commercial-proposal.module';
import { CompanyProfileModule } from './leasing-company/company-profile/company-profile.module';
import { InfrastructureModule } from './leasing-company/infrastructure/infrastructure.module';
import { LeasingCompanyModule } from './leasing-company/leasing-company.module';
import { PreferenceFilterModule } from './leasing-company/preference-filter/preference-filter.module';
import { options } from './typeorm.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(options),
    PreferenceFilterModule,
    InfrastructureModule,
    CompanyProfileModule,
    LeasingCompanyModule,
    LeasingClientModule,
    ClientProfileModule,
    ApplicationModule,
    CommercialProposalModule,
    AuthModule,
    UserModule,
    DictionariesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
