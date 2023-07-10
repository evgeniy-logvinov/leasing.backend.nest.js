import { Module } from '@nestjs/common';
import { CommercialProposalService } from './commercial-proposal.service';
import { CommercialProposalController } from './commercial-proposal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommercialProposal } from './entity/commercial-proposal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommercialProposal])],
  providers: [CommercialProposalService],
  controllers: [CommercialProposalController],
})
export class CommercialProposalModule {}
