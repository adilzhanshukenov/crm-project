import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import {
  ProjectStage,
  ProjectStageDocument,
} from '../../project-management/project-stage/project-stage.schema';
import {
  TaskStageUser,
  TaskStageUserDocument,
} from '../task-stage-user/task-stage-user.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>,
    @InjectModel(ProjectStage.name)
    private projectStageModel: Model<ProjectStageDocument>,
    @InjectModel(TaskStageUser.name)
    private taskStageUserModel: Model<TaskStageUserDocument>,
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
    const firstStage = await this.projectStageModel.findOne(
      { project: createTaskDto.project, order: 0 },
      'stage',
      {
        lean: true,
      },
    );
    if (!firstStage) {
      throw new BadRequestException(
        `No stages found for project ${createTaskDto.project}`,
      );
    }

    const task = new this.taskModel({
      ...createTaskDto,
      stage: firstStage.stage,
    });

    const createTaskStageUserDto = {
      task: task._id.toString(),
      stage: firstStage._id.toString(),
    };

    const taskStageUser = new this.taskStageUserModel(createTaskStageUserDto);

    await task.save();
    await taskStageUser.save();

    return task;
  }
}
