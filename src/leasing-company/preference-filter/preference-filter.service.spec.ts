import { Test, TestingModule } from '@nestjs/testing';
import { PreferenceFilterService } from './preference-filter.service';

describe('PreferenceFilterService', () => {
  let service: PreferenceFilterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreferenceFilterService],
    }).compile();

    service = module.get<PreferenceFilterService>(PreferenceFilterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
