import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommercialProposalService } from './commercial-proposal.service';
import { CommercialProposal } from './entity/commercial-proposal.entity';

@ApiTags('LeasingCompany')
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
