import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role/role.service';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { Role } from './role/entity/role.entity';
import { Permission } from './permission/entity/permission.entity';
import { UserController } from './user.controller';
import { LeasingClient } from 'src/leasing-client/entity/leasing-client.entity';
import { ClientProfile } from 'src/leasing-client/client-profile/entity/client-profile.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      Permission,
      LeasingClient,
      ClientProfile,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, RoleService],
  exports: [UserService],
})
export class UserModule {}
