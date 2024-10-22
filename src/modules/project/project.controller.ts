import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create Project' })
  @ApiBody({
    type: CreateProjectDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The project was succesfully created.',
  })
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    await this.projectService.createProject(createProjectDto);
  }

  @Get('company/:companyId')
  @ApiOperation({ summary: 'Get projects of company' })
  @ApiParam({
    name: 'id', // Name of the parameter
    type: 'string', // Type of the parameter
    description: 'The ID of the company.', // Description
    example: '123', // Example for Swagger
  })
  @ApiResponse({
    status: 200,
    description: 'Projects were found.',
  })
  async getAllProjectsOfCompany(@Param('companyId') companyID: string) {
    return this.projectService.getAllProjectsOfCompany(companyID);
  }
}
