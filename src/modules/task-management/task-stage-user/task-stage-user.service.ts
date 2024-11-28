import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskStageUser, TaskStageUserDocument } from './task-stage-user.schema';
import { Model } from 'mongoose';
import { CreateTaskStageUserDto } from './dto/create-task-stage-user.dto';
import { UpdateTaskStageUserDto } from './dto/update-task-stage-user.dto';
import { Task, TaskDocument } from '../task/task.schema';

@Injectable()
export class TaskStageUserService {
  constructor(
    @InjectModel(TaskStageUser.name)
    private readonly taskStageUserModel: Model<TaskStageUserDocument>,
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async createTaskInStage(
    createTaskStageUserDto: CreateTaskStageUserDto,
  ): Promise<TaskStageUser> {
    const createdTask = new this.taskStageUserModel(createTaskStageUserDto);
    return createdTask.save();
  }

  async getTaskStageUsersByProjectId(
    projectId: string,
  ): Promise<TaskStageUser[]> {
    return this.taskStageUserModel
      .find({ projectId })
      .populate('user')
      .lean(true);
  }

  async updateTaskStageUser(
    taskId: string,
    updateTaskStageUserDto: UpdateTaskStageUserDto,
  ): Promise<TaskStageUser> {
    const { stageId, userId } = updateTaskStageUserDto;

    const task = await this.taskModel.findOne({ _id: taskId });

    const taskStageUser = await this.taskStageUserModel.findOne({
      task: taskId,
    });

    if (!task) {
      throw new NotFoundException(`Task with Id ${taskId} not found`);
    }
    //console.log('TaskStageUser: ', taskStageUser);
    if (!taskStageUser) {
      throw new NotFoundException(
        `TaskStageUser with taskId ${taskId} not found`,
      );
    }

    task.stage = stageId;
    await task.save();

    taskStageUser.stage = stageId;
    if (userId) {
      taskStageUser.user = userId;
    }
    return await taskStageUser.save();
  }

  async getAllTasksInStage(stageId: string): Promise<TaskStageUser[]> {
    return await this.taskStageUserModel.find({ stage: stageId }, '', {
      lean: true,
    });
  }
}
