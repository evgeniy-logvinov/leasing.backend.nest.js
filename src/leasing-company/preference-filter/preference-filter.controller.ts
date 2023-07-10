import { Controller, Get } from '@nestjs/common';
import { PreferenceFilter } from './entity/preference-filter.entity';
import { PreferenceFilterService } from './preference-filter.service';

@Controller('preference-filter')
export class PreferenceFilterController {
  constructor(
    private readonly preferenceFilterService: PreferenceFilterService,
  ) {}

  @Get()
  getPreferenceFilters(): Promise<PreferenceFilter[]> {
    return this.preferenceFilterService.getAll();
  }
}
