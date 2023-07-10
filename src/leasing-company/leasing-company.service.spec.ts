import { Test, TestingModule } from '@nestjs/testing';
import { LeasingCompanyService } from './leasing-company.service';

describe('LeasingCompanyService', () => {
  let service: LeasingCompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeasingCompanyService],
    }).compile();

    service = module.get<LeasingCompanyService>(LeasingCompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
