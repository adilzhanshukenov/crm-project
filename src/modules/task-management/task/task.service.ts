import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>,
  ) {}

  /**
   *
   * @param projectId
   * @returns
   */
  async fetchAllTasks(projectId: string): Promise<Task[]> {
    return await this.taskModel
      .find({ project: projectId })
      .populate('stage')
      .lean(true);
  }

  async moveTask(taskId: string, stageId: string) {
    return this.taskModel.findOneAndUpdate(
      { _id: taskId },
      { stage: stageId },
      { new: true },
    );
  }

  /**
   *
   * @param createTaskDto
   * @returns
   */
  async createTask(createTaskDto: CreateTaskDto) {
    const task = new this.taskModel(createTaskDto);
    return await task.save();
  }
}
