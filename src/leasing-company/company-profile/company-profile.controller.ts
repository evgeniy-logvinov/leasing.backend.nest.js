import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyProfileService } from './company-profile.service';
import { CompanyProfile } from './entity/company-profile.entity';

@ApiTags('LeasingCompany')
@Controller('company-profile')
export class CompanyProfileController {
  constructor(private readonly companyInfoService: CompanyProfileService) {}

  @Get()
  getCompanyProfile(): Promise<CompanyProfile[]> {
    return this.companyInfoService.getAll();
  }
}
