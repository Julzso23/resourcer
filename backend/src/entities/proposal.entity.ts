import {
  Entity,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Proposal extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @ManyToOne(() => User, { nullable: false })
  creator: User;

  @Column({ nullable: true })
  submittedAt?: Date;
}
