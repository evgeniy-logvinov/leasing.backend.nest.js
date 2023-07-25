import { Module } from '@nestjs/common';
import { LeasingClientService } from './leasing-client.service';
import { LeasingClientController } from './leasing-client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeasingClient } from './entity/leasing-client.entity';
import { ClientProfile } from './client-profile/entity/client-profile.entity';
import { User } from 'src/user/entity/user.entity';
import { Role } from 'src/user/role/entity/role.entity';
import { RoleService } from 'src/user/role/role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LeasingClient, ClientProfile, User, Role]),
  ],
  providers: [LeasingClientService, RoleService],
  controllers: [LeasingClientController],
})
export class LeasingClientModule {}
