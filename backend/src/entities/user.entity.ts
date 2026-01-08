import { Column, Entity, OneToMany } from 'typeorm'
import { UserPermission } from './userPermission.entity'
import { BaseEntity } from './base.entity'

@Entity()
export class User extends BaseEntity {
  @Column({
    unique: true,
  })
  name: string

  @Column({
    unique: true,
  })
  email: string

  @Column()
  password: string

  @OneToMany(() => UserPermission, (userPermission) => userPermission.user)
  permissions: UserPermission[]
}
