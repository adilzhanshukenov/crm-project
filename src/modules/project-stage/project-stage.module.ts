import { Module } from '@nestjs/common';
import { ProjectStageService } from './project-stage.service';
import { ProjectStageController } from './project-stage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectStage, ProjectStageSchema } from './projectStage.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProjectStage.name, schema: ProjectStageSchema },
    ]),
  ],
  providers: [ProjectStageService],
  controllers: [ProjectStageController],
})
export class ProjectStageModule {}
