import { Controller, Get } from '@nestjs/common';
import { ProjectStatus } from './project-status.enum';

@Controller('projectstatus')
export class ProjectStatusController {
  @Get()
  getProjectStatuses() {
    return Object.values(ProjectStatus);
  }
}
