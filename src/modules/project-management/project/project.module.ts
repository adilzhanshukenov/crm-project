import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './project.schema';
import { ProjectRoleController } from '../enums/project-role/project-role.controller';
import { Stage, StageSchema } from '../stage/stage.schema';
import {
  ProjectStage,
  ProjectStageSchema,
} from '../project-stage/project-stage.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    MongooseModule.forFeature([{ name: Stage.name, schema: StageSchema }]),
    MongooseModule.forFeature([
      { name: ProjectStage.name, schema: ProjectStageSchema },
    ]),
  ],
  providers: [ProjectService],
  controllers: [ProjectController, ProjectRoleController],
})
export class ProjectModule {}
