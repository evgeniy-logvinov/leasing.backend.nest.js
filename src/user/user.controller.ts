import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entity/user.entity';
import { Permission } from './permission/entity/permission.entity';
import { Role } from './role/entity/role.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get('/role')
  getRoles(): Promise<Role[]> {
    return this.userService.getAllRole();
  }

  @Get('/permission')
  getPermissions(): Promise<Permission[]> {
    return this.userService.getAllPermissions();
  }
}
