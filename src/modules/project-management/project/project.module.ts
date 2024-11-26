import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './project.schema';
import { ProjectRoleController } from '../enums/project-role/project-role.controller';
import { ProjectStatusController } from '../enums/project-status/project-status.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  providers: [ProjectService],
  controllers: [
    ProjectController,
    ProjectRoleController,
    ProjectStatusController,
  ],
})
export class ProjectModule {}
