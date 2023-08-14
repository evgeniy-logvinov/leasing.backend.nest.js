import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { getUserIdFromReq } from 'src/utils/user';
import { CompanyProfileService } from './company-profile.service';
import { CompanyProfile } from './entity/company-profile.entity';

@ApiBearerAuth()
@ApiTags('CompanyProfile')
@Controller('company-profile')
@UseGuards(AuthGuard())
export class CompanyProfileController {
  constructor(private readonly companyInfoService: CompanyProfileService) {}

  @Get()
  getCompanyProfile(@Req() req: Request): Promise<CompanyProfile> {
    const userId = getUserIdFromReq(req);
    return this.companyInfoService.getByUserId(userId);
  }
}
