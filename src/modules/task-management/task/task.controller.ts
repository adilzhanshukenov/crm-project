import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdateTaskDto } from './dto/update-task.dto';
import { RolesGuard } from '../../../guards/roles.guard';
import { Role } from '../../auth/decorators/role.decorator';
import { ProjectRole } from '../../project-management/enums/project-role/project-role.enum';

@Controller('task')
@UseGuards(RolesGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Role(ProjectRole.OWNER)
  @Post()
  @ApiOperation({ summary: 'Add task to project' })
  @ApiBody({
    type: 'CreateTaskDto',
  })
  @ApiResponse({
    status: 201,
    description: 'The user was succesfully created',
  })
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto);
  }

  @Get(':projectId')
  @ApiParam({
    name: 'projectId',
    type: 'string',
    example: '123',
    description: 'Id of the project',
  })
  async fetchAllTasks(@Param('projectId') projectId: string) {
    return await this.taskService.fetchAllTasks(projectId);
  }

  @Patch(':taskId/archive')
  async archiveTask(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    this.taskService.archiveTask(taskId, updateTaskDto);
  }
}
