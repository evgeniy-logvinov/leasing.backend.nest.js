import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PreferenceFilter } from './entity/preference-filter.entity';
import { PreferenceFilterService } from './preference-filter.service';

@ApiBearerAuth()
@ApiTags('LeasingCompany')
@Controller('preference-filter')
@UseGuards(AuthGuard())
export class PreferenceFilterController {
  constructor(
    private readonly preferenceFilterService: PreferenceFilterService,
  ) {}

  @Get()
  getPreferenceFilters(): Promise<PreferenceFilter[]> {
    return this.preferenceFilterService.getAll();
  }
}
