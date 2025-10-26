import { Controller, Get, NotImplementedException, Param } from '@nestjs/common';
import { Proposal } from 'entities/proposal.entity';
import { ProposalsService } from './proposals.service';

@Controller('proposals')
export class ProposalsController {
  constructor(private proposalsService: ProposalsService) {}

  @Get()
  async getAll(): Promise<Proposal[]> {
    return this.proposalsService.findAll();
  }

  @Get('master')
  async getMaster(): Promise<void> {
    throw new NotImplementedException();
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Proposal | null> {
    return this.proposalsService.findOne(id);
  }
}
