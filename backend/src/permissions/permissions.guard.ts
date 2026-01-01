import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PermissionsService } from './permissions.service';
import { Permission } from '../../../dtos/permission.enum';
import { Reflector } from '@nestjs/core';
import { Request } from 'request';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private permissionsService: PermissionsService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user } = context.switchToHttp().getRequest<Request>();
    const permissions = this.reflector.getAllAndOverride<Permission[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );
    if (!permissions || permissions.length === 0) {
      return true;
    }
    return this.permissionsService.hasPermissions(user.id, permissions);
  }
}
