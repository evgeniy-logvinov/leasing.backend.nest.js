import { Controller, Get } from '@nestjs/common';
import { LeasingCompany } from './entity/leasing-company.entity';
import { LeasingCompanyService } from './leasing-company.service';

@Controller('leasing-company')
export class LeasingCompanyController {
  constructor(private readonly leasingCompanyService: LeasingCompanyService) {}

  @Get()
  getLeasingCompany(): Promise<LeasingCompany[]> {
    return this.leasingCompanyService.getAll();
  }
}