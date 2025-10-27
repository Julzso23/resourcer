import { Module } from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { ProposalsController } from './proposals.controller';
import { Proposal } from 'entities/proposal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffMember } from 'entities/staffMember.entity';
import { Project } from 'entities/project.entity';
import { Allocation } from 'entities/allocation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proposal, StaffMember, Project, Allocation]),
  ],
  providers: [ProposalsService],
  controllers: [ProposalsController],
})
export class ProposalsModule {}
