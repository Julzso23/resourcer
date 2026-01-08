import { Column, Entity, ManyToOne } from 'typeorm'
import { User } from './user.entity'
import { Permission } from '../../../dtos/permission.enum'
import { BaseEntity } from './base.entity'

@Entity()
export class UserPermission extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
  user: User

  @Column({
    type: 'enum',
    enum: Permission,
  })
  permission: Permission
}
