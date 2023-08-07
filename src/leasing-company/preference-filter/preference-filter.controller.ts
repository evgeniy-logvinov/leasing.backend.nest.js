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
import { PreferenceFilter } from './entity/preference-filter.entity';
import { PreferenceFilterService } from './preference-filter.service';

@ApiBearerAuth()
@ApiTags('LeasingCompany')
@Controller('preference-filter')
@UseGuards(AuthGuard())
export class PreferenceFilterController {
  constructor(
    private readonly preferenceFilterService: PreferenceFilterService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async getPreferenceFilter(@Req() req: Request): Promise<PreferenceFilter> {
    const userId = getUserIdFromReq(req);
    return this.preferenceFilterService.getByUserId(userId);
  }

  @Get('/all')
  async getPreferenceFilters(@Req() req: Request): Promise<PreferenceFilter[]> {
    await this.adminCheck(req);
    return this.preferenceFilterService.getAll();
  }

  async adminCheck(req: Request) {
    const userId = getUserIdFromReq(req);
    const admin = await this.userService.adminRole(userId);
    if (!admin) {
      throw new ForbiddenException('Access denied');
    }
  }
}
