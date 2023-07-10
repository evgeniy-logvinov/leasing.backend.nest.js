import { Test, TestingModule } from '@nestjs/testing';
import { LeasingClientController } from './leasing-client.controller';

describe('LeasingClientController', () => {
  let controller: LeasingClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeasingClientController],
    }).compile();

    controller = module.get<LeasingClientController>(LeasingClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
