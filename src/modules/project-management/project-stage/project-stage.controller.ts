import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProjectStageService } from './project-stage.service';
import { CreateProjectStageDto } from './dto/create-project-stage.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('project-stage')
export class ProjectStageController {
  constructor(private readonly projectStageService: ProjectStageService) {}

  //@Role(ProjectRole.OWNER)
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
    await this.projectStageService.addStageToProject(createProjectStageDto);
  }

  @Get(':projectId/first-stage')
  @ApiOperation({ summary: 'Get first stage in order' })
  @ApiParam({
    name: 'projectId',
    type: 'string',
    example: '123',
    description: 'Project ID',
  })
  async getFirstStageInOrder(@Param('projectId') projectId: string) {
    return this.projectStageService.getFirstStageInOrder(projectId);
  }

  //@Role(ProjectRole.OWNER)
  @Get(':projectId')
  @ApiOperation({ summary: 'Fetch All Stages of Project' })
  @ApiParam({
    name: 'projectId',
    type: 'string',
    example: '123',
    description: 'Id of the project',
  })
  @ApiResponse({
    status: 200,
    description: 'All stages are shown',
  })
  @ApiResponse({
    status: 404,
    description: 'Stage not found',
  })
  async fetchAllStagesOfProject(@Param('projectId') projectId: string) {
    return await this.projectStageService.getAllStagesOfProject(projectId);
  }

  //@Role(ProjectRole.OWNER)
  @Delete(':projectId/stages/:stageId')
  @ApiOperation({ summary: 'Delete stage from project' })
  @ApiParam({
    name: 'stage',
    type: 'string',
    example: '123',
    description: 'Id of the stage',
  })
  @ApiResponse({
    status: 200,
    description: 'Stage was successfully deleted',
  })
  async deleteStageFromProject(
    @Param('stageId') stage: string,
    @Param('projectId') project: string,
  ) {
    await this.projectStageService.deleteStageFromProject(stage, project);
  }
}
