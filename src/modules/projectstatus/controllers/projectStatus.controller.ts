import { Controller, Get } from '@nestjs/common';
import { ProjectStatus } from '../enum/projectStatus.enum';

@Controller('projectstatus')
export class ProjectStatusController {
  @Get()
  getProjectStatuses() {
    return Object.values(ProjectStatus);
  }
}
