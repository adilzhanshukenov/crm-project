import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskStageUserService } from './task-stage-user.service';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateTaskStageUserDto } from './dto/create-task-stage-user.dto';

@Controller('task-stage-user')
export class TaskStageUserController {
  constructor(private readonly taskStageUserService: TaskStageUserService) {}

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
}
