import {
  Controller,
  ForbiddenException,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { getUserIdFromReq } from 'src/utils/user';
import { ApplicationService } from './application.service';
import { Application } from './entity/application.entity';

@ApiBearerAuth()
@ApiTags('Applications')
@Controller('applications')
@UseGuards(AuthGuard())
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async getApplications(@Req() req: Request): Promise<Application[]> {
    await this.adminCheck(req);
    return this.applicationService.getAll();
  }

  async adminCheck(req: Request) {
    const userId = getUserIdFromReq(req);
    const admin = await this.userService.adminRole(userId);
    if (!admin) {
      throw new ForbiddenException('Access denied');
    }
  }
}
