import { Test, TestingModule } from '@nestjs/testing';
import { LeasingCompanyController } from './leasing-company.controller';

describe('LeasingCompanyController', () => {
  let controller: LeasingCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeasingCompanyController],
    }).compile();

    controller = module.get<LeasingCompanyController>(LeasingCompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
