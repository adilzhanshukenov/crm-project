import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task.schema';
import {
  ProjectStage,
  ProjectStageSchema,
} from '../../project-management/project-stage/project-stage.schema';
import {
  TaskStageUser,
  TaskStageUserSchema,
} from '../task-stage-user/task-stage-user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: ProjectStage.name, schema: ProjectStageSchema },
      { name: TaskStageUser.name, schema: TaskStageUserSchema },
    ]),
  ],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
