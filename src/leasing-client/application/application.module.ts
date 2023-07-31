import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entity/application.entity';
import { LeasingClient } from '../entity/leasing-client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Application, LeasingClient])],
  providers: [ApplicationService],
  controllers: [ApplicationController],
})
export class ApplicationModule {}
