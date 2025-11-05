import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Allocation } from './allocation.entity';
import { Proposal } from './proposal.entity';

@Entity()
export class AllocationRemoval {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Allocation, (allocation) => allocation.removals, {
    nullable: false,
  })
  allocation: Allocation;

  @ManyToOne(() => Proposal, { nullable: false })
  proposal: Proposal;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
