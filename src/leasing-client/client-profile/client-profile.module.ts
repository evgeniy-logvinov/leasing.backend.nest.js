import { Module } from '@nestjs/common';
import { ClientProfileService } from './client-profile.service';
import { ClientProfileController } from './client-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProfile } from './entity/client-profile.entity';
import { LeasingClient } from '../entity/leasing-client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientProfile, LeasingClient])],
  providers: [ClientProfileService],
  controllers: [ClientProfileController],
})
export class ClientProfileModule {}
