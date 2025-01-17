import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserProjectService } from '../modules/project-management/project-user/project-user.service';
import { ROLE_KEY } from '../modules/auth/decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflectror: Reflector,
    private userProjectService: UserProjectService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflectror.getAllAndOverride<string>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // console.log('RequiredRole: ', requiredRole);

    if (!requiredRole) {
      return true; // No roles required, allow access
    }
    const request = await context.switchToHttp().getRequest();

    // console.log('Headers:', request.headers);
    // console.log('Params:', request.params);
    // console.log('Query:', request.query);
    // console.log('Body:', request.body);
    // Log specific properties

    const user = request.user; // User info from JwtAuthGuard
    const projectId =
      request.params.projectId || // From route params
      request.query.projectId || // From query string
      request.body.project; // From request body
    // console.log('User: ', user);
    // console.log('Project: ', projectId);

    if (!user || !projectId) {
      throw new ForbiddenException('User or project information is missing.');
    }

    const userProject = await this.userProjectService.findUserRole(
      user._id,
      projectId,
    );

    // console.log('UserProject Role: ', userProject.role);

    if (!userProject) {
      throw new ForbiddenException('You are not part of this project.');
    }

    if (userProject.role !== requiredRole) {
      throw new ForbiddenException(
        'You do not have permission for this action.',
      );
    }

    return true;
  }
}
