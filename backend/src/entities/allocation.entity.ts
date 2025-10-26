import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Staff } from './staff.entity';
import { User } from './user.entity';
import { Project } from './project.entity';
import { Proposal } from './proposal.entity';

@Entity()
export class Allocation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Staff)
  staff?: Staff;

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

  @ManyToMany(() => Proposal)
  @JoinTable()
  deletedIn: Proposal[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
