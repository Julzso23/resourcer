import {
  Entity,
  ManyToOne,
} from 'typeorm';
import { Allocation } from './allocation.entity';
import { Proposal } from './proposal.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class AllocationRemoval extends BaseEntity {
  @ManyToOne(() => Allocation, (allocation) => allocation.removals, {
    nullable: false,
  })
  allocation: Allocation;

  @ManyToOne(() => Proposal, { nullable: false })
  proposal: Proposal;
}
