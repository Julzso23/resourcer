import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StaffMember } from './staffMember.entity';
import { User } from './user.entity';
import { Project } from './project.entity';
import { Proposal } from './proposal.entity';
import { AllocationRemoval } from './allocationRemoval.entity';

@Entity()
export class Allocation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => StaffMember)
  staffMember?: StaffMember;

  @ManyToOne(() => Project, { nullable: false })
  project: Project;

  @Column()
  percentage: number;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @ManyToOne(() => User, { nullable: false })
  creator: User;

  @ManyToOne(() => Proposal, { nullable: false })
  createdIn: Proposal;

  @OneToMany(() => AllocationRemoval, removal => removal.allocation)
  removals: AllocationRemoval[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
