import { Module } from '@nestjs/common';
import { LeasingClientService } from './leasing-client.service';
import { LeasingClientController } from './leasing-client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeasingClient } from './entity/leasing-client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeasingClient])],
  providers: [LeasingClientService],
  controllers: [LeasingClientController],
})
export class LeasingClientModule {}
