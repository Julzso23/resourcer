import { Controller, Get, Param, Query } from '@nestjs/common';
import { Proposal } from 'entities/proposal.entity';
import { ProposalsService } from './proposals.service';
import { ProposalAllocationsDto } from '../../../dtos/proposalAllocations.dto';

@Controller('proposals')
export class ProposalsController {
  constructor(private proposalsService: ProposalsService) {}

  @Get()
  async getAll(): Promise<Proposal[]> {
    return this.proposalsService.findAll();
  }

  @Get('master')
  async getMaster(
    @Query('projectView') projectView: boolean,
    @Query('withProposal') withProposal?: number,
  ): Promise<ProposalAllocationsDto> {
    return this.proposalsService.getMaster(projectView, withProposal);
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Proposal | null> {
    return this.proposalsService.findOne(id);
  }
}
