import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserPermission } from 'entities/userPermission.entity'
import { PermissionsService } from './permissions.service'
import { APP_GUARD } from '@nestjs/core'
import { PermissionsGuard } from './permissions.guard'

@Module({
  imports: [TypeOrmModule.forFeature([UserPermission])],
  providers: [
    PermissionsService,
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class PermissionsModule {}
