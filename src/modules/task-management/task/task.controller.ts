import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

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
}
