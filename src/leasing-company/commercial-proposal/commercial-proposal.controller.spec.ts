import { Test, TestingModule } from '@nestjs/testing';
import { CommercialProposalController } from './commercial-proposal.controller';

describe('CommercialProposalController', () => {
  let controller: CommercialProposalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommercialProposalController],
    }).compile();

    controller = module.get<CommercialProposalController>(
      CommercialProposalController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
