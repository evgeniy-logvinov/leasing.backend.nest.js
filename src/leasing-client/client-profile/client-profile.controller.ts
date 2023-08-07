import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { getUserIdFromReq } from 'src/utils/user';
import { ClientProfileService } from './client-profile.service';
import { UpdateClientProfileDto } from './dto/update-client-profile.dto';
import { ClientProfile } from './entity/client-profile.entity';
@ApiBearerAuth()
@ApiTags('ClientProfile')
@Controller('client-profile')
@UseGuards(AuthGuard())
export class ClientProfileController {
  constructor(
    private readonly clientProfileService: ClientProfileService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async getClientProfile(@Req() req: Request): Promise<ClientProfile> {
    const userId = getUserIdFromReq(req);
    return this.clientProfileService.getByUserId(userId);
  }

  @Put()
  async putClientProfile(
    @Req() req: Request,
    @Body(ValidationPipe) clientProfileDto: UpdateClientProfileDto,
  ): Promise<{ message: string }> {
    const userId = getUserIdFromReq(req);
    return this.clientProfileService.updateProfile(userId, clientProfileDto);
  }

  async adminCheck(req: Request) {
    const userId = getUserIdFromReq(req);
    const admin = await this.userService.adminRole(userId);
    if (!admin) {
      throw new ForbiddenException('Access denied');
    }
  }
}
