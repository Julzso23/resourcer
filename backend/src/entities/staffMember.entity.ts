import {
  Column,
  Entity,
} from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class StaffMember extends BaseEntity {
  @Column()
  name: string;
}
