import { Controller, Get } from '@nestjs/common';
import { CommercialProposalService } from './commercial-proposal.service';
import { CommercialProposal } from './entity/commercial-proposal.entity';

@Controller('commercial-proposal')
export class CommercialProposalController {
  constructor(
    private readonly commercialProposalService: CommercialProposalService,
  ) {}

  @Get()
  getCommercialProposal(): Promise<CommercialProposal[]> {
    return this.commercialProposalService.getAll();
  }
}
