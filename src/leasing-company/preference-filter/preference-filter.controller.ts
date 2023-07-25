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
  async getPreferenceFilters(): Promise<PreferenceFilter[]> {
    return this.preferenceFilterService.getAll();
  }
}
