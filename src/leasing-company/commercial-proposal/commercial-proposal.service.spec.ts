import { Test, TestingModule } from '@nestjs/testing';
import { CommercialProposalService } from './commercial-proposal.service';

describe('CommercialProposalService', () => {
  let service: CommercialProposalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommercialProposalService],
    }).compile();

    service = module.get<CommercialProposalService>(CommercialProposalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
