import { Module } from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { ProposalsController } from './proposals.controller';
import { Proposal } from 'entities/proposal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Proposal])],
  providers: [ProposalsService],
  controllers: [ProposalsController],
})
export class ProposalsModule {}
