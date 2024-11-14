import { Body, Controller, Post } from '@nestjs/common';
import { ProjectStageService } from './project-stage.service';
import { CreateProjectStageDto } from './dto/create-project-stage.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('project-stage')
export class ProjectStageController {
  constructor(private readonly projectStageService: ProjectStageService) {}

  @Post()
  @ApiOperation({ summary: 'Add stage to project' })
  @ApiBody({
    type: CreateProjectStageDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Stage was added to project',
  })
  @ApiResponse({
    status: 400,
    description: 'Request is bad',
  })
  async addStageToProject(
    @Body() createProjectStageDto: CreateProjectStageDto,
  ) {
    await this.addStageToProject(createProjectStageDto);
  }
}
