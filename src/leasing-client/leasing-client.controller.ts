import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateClientDto } from 'src/user/dto/create-client.dto';
import { UserService } from 'src/user/user.service';
import { getUserIdFromReq } from 'src/utils/user';
import { ClientProfile } from './client-profile/entity/client-profile.entity';
import { LeasingClient } from './entity/leasing-client.entity';
import { LeasingClientService } from './leasing-client.service';

@ApiBearerAuth()
@ApiTags('LeasingClient')
@Controller('leasing-client')
@UseGuards(AuthGuard())
export class LeasingClientController {
  constructor(
    private readonly leasingClientService: LeasingClientService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async getLeasingClient(@Req() req: Request): Promise<LeasingClient[]> {
    await this.adminCheck(req);
    return this.leasingClientService.getAll();
  }

  @Post()
  async createClient(
    @Req() req: Request,
    @Body(ValidationPipe) user: CreateClientDto,
  ): Promise<{ message: string }> {
    await this.adminCheck(req);
    return this.leasingClientService.createClient(user);
  }

  @Post('/description')
  async setDescription(
    @Req() req: Request,

    @Body(ValidationPipe)
    { id, description }: { id: string; description: string },
  ): Promise<{ message: string }> {
    await this.adminCheck(req);
    return this.leasingClientService.setDescription(id, description);
  }

  @Post('/invite/:id')
  async invite(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<ClientProfile> {
    await this.adminCheck(req);
    return this.leasingClientService.invite(id);
  }

  @Post('/block/:id')
  async block(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<ClientProfile> {
    await this.adminCheck(req);
    return this.leasingClientService.block(id);
  }

  @Post('/unblock/:id')
  async unblock(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<ClientProfile> {
    await this.adminCheck(req);
    return this.leasingClientService.unblock(id);
  }

  async adminCheck(req: Request) {
    const userId = getUserIdFromReq(req);
    const admin = await this.userService.adminRole(userId);
    if (!admin) {
      throw new ForbiddenException('Access denied');
    }
  }
}
