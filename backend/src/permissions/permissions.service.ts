import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPermission } from 'entities/userPermission.entity';
import { Repository } from 'typeorm';
import { Permission } from '../../../dtos/permission.enum';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(UserPermission)
    private permissionsRepository: Repository<UserPermission>,
  ) {}

  async hasPermissions(
    userId: number,
    permissions: Permission[],
  ): Promise<boolean> {
    const result: UserPermission | null = await this.permissionsRepository
      .createQueryBuilder()
      .where('userId = :userId', { userId })
      .andWhere('permission IN (:permissions)', { permissions })
      .getOne();
    return result !== null;
  }
}
