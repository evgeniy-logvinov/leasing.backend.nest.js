import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { getUserIdFromReq } from 'src/utils/user';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { Permission } from './permission/entity/permission.entity';
import { Role } from './role/entity/role.entity';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
@UseGuards(AuthGuard())
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

  @Post('/client')
  async inviteClient(
    @Req() req: Request,
    @Body(ValidationPipe) user: CreateUserDto,
  ): Promise<{ message: string }> {
    const userId = getUserIdFromReq(req);
    const admin = await this.userService.adminRole(userId);
    if (!admin) {
      throw new ForbiddenException('Access denied');
    }

    return this.userService.createClient(user);
  }
}
