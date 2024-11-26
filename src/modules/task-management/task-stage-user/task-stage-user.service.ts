import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskStageUser, TaskStageUserDocument } from './task-stage-user.schema';
import { Model } from 'mongoose';
import { CreateTaskStageUserDto } from './dto/create-task-stage-user.dto';

@Injectable()
export class TaskStageUserService {
  constructor(
    @InjectModel(TaskStageUser.name)
    private readonly taskStageUserModel: Model<TaskStageUserDocument>,
  ) {}

  async createTaskInStage(
    createTaskStageUserDto: CreateTaskStageUserDto,
  ): Promise<TaskStageUser> {
    const createdTask = new this.taskStageUserModel(createTaskStageUserDto);
    return createdTask.save();
  }

  async getAllTasksInStage(stageId: string): Promise<TaskStageUser[]> {
    return await this.taskStageUserModel.find({ stage: stageId }, '', {
      lean: true,
    });
  }
}
