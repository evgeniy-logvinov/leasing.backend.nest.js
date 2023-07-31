import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { getUserIdFromReq } from 'src/utils/user';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
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

  // TODO: check roles
  @Get()
  async getApplications(@Req() req: Request): Promise<Application[]> {
    const userId = getUserIdFromReq(req);
    const admin = await this.userService.adminRole(userId);
    const client = await this.userService.clientRole(userId);

    if (!admin && !client) {
      throw new ForbiddenException('Access denied');
    }

    if (admin) {
      return this.applicationService.getAll();
    }

    if (client) {
      return this.applicationService.getAllByUserId(userId);
    }

    throw new ForbiddenException('Access denied');
  }

  @Post()
  async createApplication(
    @Req() req: Request,
    @Body(ValidationPipe) application: CreateApplicationDto,
  ): Promise<{ message: string }> {
    const userId = getUserIdFromReq(req);
    const client = await this.userService.clientRole(userId);

    if (!client) {
      throw new ForbiddenException('Access denied');
    }

    return this.applicationService.createApplication(application, userId);
  }
}
