import { Module } from '@nestjs/common';
import { LeasingClientService } from './leasing-client.service';
import { LeasingClientController } from './leasing-client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeasingClient } from './entity/leasing-client.entity';
import { ClientProfile } from './client-profile/entity/client-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeasingClient, ClientProfile])],
  providers: [LeasingClientService],
  controllers: [LeasingClientController],
})
export class LeasingClientModule {}
