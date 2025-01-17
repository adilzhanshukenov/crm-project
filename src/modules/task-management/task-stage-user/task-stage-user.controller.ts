import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskStageUserService } from './task-stage-user.service';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateTaskStageUserDto } from './dto/create-task-stage-user.dto';
import { UpdateTaskStageUserDto } from './dto/update-task-stage-user.dto';

@Controller('task-stage-user')
export class TaskStageUserController {
  constructor(private readonly taskStageUserService: TaskStageUserService) {}

  @Post()
  @ApiOperation({ summary: 'Create Task In Stage' })
  @ApiBody({
    type: 'CreateTaskStageUserDto',
  })
  async createTaskInStage(
    @Body() createTaskStageUserDto: CreateTaskStageUserDto,
  ) {
    return await this.taskStageUserService.createTaskInStage(
      createTaskStageUserDto,
    );
  }

  @Get()
  async fetchAllTaskStageUsers() {
    return await this.taskStageUserService.fetchAllTaskStageUsers();
  }

  @Get(':stageId')
  @ApiOperation({ summary: 'Get All Tasks in Stage' })
  @ApiParam({
    name: 'stageId',
    type: 'string',
    example: '123',
    description: 'Stage ID',
  })
  async getAllTasksInStage(@Param('stageId') stageId: string) {
    return await this.taskStageUserService.getAllTasksInStage(stageId);
  }

  @Get(':taskId/user')
  @ApiOperation({ summary: 'Get task stage user' })
  @ApiParam({
    name: 'taskId',
    type: 'string',
    example: '123',
    description: 'Stage ID',
  })
  async getTaskStageUsers(@Param('taskId') taskId: string) {
    return await this.taskStageUserService.fetchTaskStageUsers(taskId);
  }

  @Post('/assign-user')
  @ApiOperation({ summary: 'Assign user to a task' })
  async assignUserToTask(
    @Body() updateTaskStageUserDto: UpdateTaskStageUserDto,
  ) {
    await this.taskStageUserService.assignUserToTask(updateTaskStageUserDto);
  }

  @Patch(':taskId')
  @ApiOperation({
    summary: 'Move task to another stage',
  })
  @ApiParam({
    name: 'taskId',
    type: ' string',
    example: '123',
    description: 'Task ID',
  })
  @ApiBody({
    type: 'UpdateTaskStageUserDto',
    description: 'Model to update task stage',
  })
  async moveTask(
    @Param('taskId') taskId: string,
    @Body() updateTaskStageUser: UpdateTaskStageUserDto,
  ) {
    return this.taskStageUserService.updateTaskStageUser(
      taskId,
      updateTaskStageUser,
    );
  }
}
