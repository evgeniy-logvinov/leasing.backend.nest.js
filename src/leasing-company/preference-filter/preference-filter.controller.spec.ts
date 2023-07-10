import { Test, TestingModule } from '@nestjs/testing';
import { PreferenceFilterController } from './preference-filter.controller';

describe('PreferenceFilterController', () => {
  let controller: PreferenceFilterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreferenceFilterController],
    }).compile();

    controller = module.get<PreferenceFilterController>(PreferenceFilterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
