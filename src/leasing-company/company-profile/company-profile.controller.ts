import { Controller, Get } from '@nestjs/common';
import { CompanyProfileService } from './company-profile.service';
import { CompanyProfile } from './entity/company-profile.entity';

@Controller('company-profile')
export class CompanyProfileController {
  constructor(private readonly companyInfoService: CompanyProfileService) {}

  @Get()
  getInfrustructure(): Promise<CompanyProfile[]> {
    return this.companyInfoService.getAll();
  }
}
