import { Controller, Get } from '@nestjs/common';
import { ProjectRole } from '../enums/ProjectRole.enum';

@Controller('projectrole')
export class ProjectRoleController {
  @Get()
  getProjectRoles() {
    return Object.values(ProjectRole);
  }
}
