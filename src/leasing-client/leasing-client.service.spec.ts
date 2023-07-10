import { Test, TestingModule } from '@nestjs/testing';
import { LeasingClientService } from './leasing-client.service';

describe('LeasingClientService', () => {
  let service: LeasingClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeasingClientService],
    }).compile();

    service = module.get<LeasingClientService>(LeasingClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
