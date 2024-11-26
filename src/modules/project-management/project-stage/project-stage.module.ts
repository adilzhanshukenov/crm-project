import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectStageService } from './project-stage.service';
import { ProjectStageController } from './project-stage.controller';
import { ProjectStage, ProjectStageSchema } from './project-stage.schema';
import { UserProjectModule } from '../project-user/project-user.module';
import { RolesGuard } from '../../../guards/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProjectStage.name, schema: ProjectStageSchema },
    ]),
    UserProjectModule,
  ],
  providers: [ProjectStageService, RolesGuard],
  controllers: [ProjectStageController],
})
export class ProjectStageModule {}
