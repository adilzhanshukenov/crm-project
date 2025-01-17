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

  /**
   *
   * @returns
   */
  async fetchAllTaskStageUsers() {
    return await this.taskStageUserModel
      .find({}, 'task user')
      .populate('user')
      .lean(true);
  }

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
    const { stage, user } = updateTaskStageUserDto;

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

    task.stage = stage;
    await task.save();

    taskStageUser.stage = stage;
    if (user) {
      taskStageUser.user = user;
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
  async assignUserToTask(updateTaskStageUserDto: UpdateTaskStageUserDto) {
    const { task, user } = updateTaskStageUserDto;

    console.log('User: ', user);

    let taskStageUser = await this.taskStageUserModel.findOne({ task });
    console.log('taskStageUser', taskStageUser);
    if (!taskStageUser) {
      taskStageUser = new this.taskStageUserModel(updateTaskStageUserDto);
    }
    taskStageUser.user = user;
    console.log('UpdatedTaskStageUser: ', taskStageUser);
    await taskStageUser.save();
  }

  async fetchTaskStageUsers(taskId: string): Promise<TaskStageUser[]> {
    return this.taskStageUserModel.find({ task: taskId }, '', { lean: true });
  }
}
