import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskStageUserService } from './task-stage-user.service';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateTaskStageUserDto } from './dto/create-task-stage-user.dto';
import { UpdateTaskStageUserDto } from './dto/update-task-stage-user.dto';
import { AssignUserToTaskDto } from './dto/assign-user-to-task.dto';

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

  @Get('/user/:taskId')
  @ApiOperation({ summary: 'Get task stage user' })
  @ApiParam({
    name: 'taskId',
    type: 'string',
    example: '123',
    description: 'Stage ID',
  })
  async getTaskStageUser(@Param('taskId') taskId: string) {
    return await this.taskStageUserService.getUserByTask(taskId);
  }

  @Patch('assign-user')
  @ApiOperation({ summary: 'Assign user to a task' })
  async assignUserToTask(@Body() assignUserToTaskDto: AssignUserToTaskDto) {
    return this.taskStageUserService.assignUserToTask(assignUserToTaskDto);
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
