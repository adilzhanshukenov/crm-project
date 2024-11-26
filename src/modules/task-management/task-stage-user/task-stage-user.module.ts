import { Module } from '@nestjs/common';
import { TaskStageUserService } from './task-stage-user.service';
import { TaskStageUserController } from './task-stage-user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskStageUser, TaskStageUserSchema } from './task-stage-user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskStageUser.name, schema: TaskStageUserSchema },
    ]),
  ],
  providers: [TaskStageUserService],
  controllers: [TaskStageUserController],
})
export class TaskStageUserModule {}
