import { SetMetadata } from '@nestjs/common';
import { Permission } from '../../../dtos/permission.enum';

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata('permissions', permissions);
