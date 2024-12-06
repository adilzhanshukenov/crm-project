import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskStageUser, TaskStageUserDocument } from './task-stage-user.schema';
import { Model } from 'mongoose';
import { CreateTaskStageUserDto } from './dto/create-task-stage-user.dto';
import { UpdateTaskStageUserDto } from './dto/update-task-stage-user.dto';
import { Task, TaskDocument } from '../task/task.schema';
import { AssignUserToTaskDto } from './dto/assign-user-to-task.dto';

@Injectable()
export class TaskStageUserService {
  constructor(
    @InjectModel(TaskStageUser.name)
    private readonly taskStageUserModel: Model<TaskStageUserDocument>,
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  /**
   *
   * @param createTaskStageUserDto
   * @returns
   */
  async createTaskInStage(
    createTaskStageUserDto: CreateTaskStageUserDto,
  ): Promise<TaskStageUser> {
    const createdTask = new this.taskStageUserModel(createTaskStageUserDto);
    return createdTask.save();
  }

  /**
   *
   * @param projectId
   * @returns
   */
  async getUserByTask(taskId: string): Promise<TaskStageUser> {
    return await this.taskStageUserModel
      .findOne({ task: taskId }, 'user')
      .populate('user')
      .lean(true);
  }

  /**
   *
   * @param taskId
   * @param updateTaskStageUserDto
   * @returns
   */
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

  /**
   *
   * @param stageId
   * @returns
   */
  async getAllTasksInStage(stageId: string): Promise<TaskStageUser[]> {
    return await this.taskStageUserModel.find({ stage: stageId }, '', {
      lean: true,
    });
  }

  /**
   *
   * @param assignUserToTask
   * @returns
   */
  async assignUserToTask(
    assignUserToTask: AssignUserToTaskDto,
  ): Promise<TaskStageUser> {
    const { task, user } = assignUserToTask;

    const taskStageUser = await this.taskStageUserModel.findOne({ task });
    if (!taskStageUser) {
      throw new NotFoundException(`TaskStageUser with ID #${task} not found`);
    }
    taskStageUser.user = user;
    return taskStageUser.save();
  }

  async fetchTaskStageUsers(taskId: string): Promise<TaskStageUser[]> {
    return this.taskStageUserModel.find({ task: taskId }, '', { lean: true });
  }
}
