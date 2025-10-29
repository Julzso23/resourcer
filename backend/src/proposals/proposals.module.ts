import { Module } from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { ProposalsController } from './proposals.controller';
import { Proposal } from 'entities/proposal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffMember } from 'entities/staffMember.entity';
import { Project } from 'entities/project.entity';
import { AllocationsModule } from 'allocations/allocations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proposal, StaffMember, Project]),
    AllocationsModule,
  ],
  providers: [ProposalsService],
  controllers: [ProposalsController],
})
export class ProposalsModule {}
