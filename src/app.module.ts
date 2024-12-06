import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CompanyModule } from './modules/company-management/company/company.module';
import { ProjectModule } from './modules/project-management/project/project.module';
import { UserCompanyModule } from './modules/company-management/company-user/company-user.module';
import { PositionModule } from './modules/company-management/position/position.module';
import { StageModule } from './modules/project-management/stage/stage.module';
import { UserProjectModule } from './modules/project-management/project-user/project-user.module';
import { ProjectStageModule } from './modules/project-management/project-stage/project-stage.module';
import { TaskModule } from './modules/task-management/task/task.module';
import { ProjectRoleController } from './modules/project-management/enums/project-role/project-role.controller';
import TaskPriorityController from './modules/task-management/enums/taskPriority/taskPriority.controller';
import TaskStatusController from './modules/task-management/enums/taskStatus/taskStatus.controller';
import { TaskStageUserModule } from './modules/task-management/task-stage-user/task-stage-user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    AuthModule,
    CompanyModule,
    ProjectModule,
    PositionModule,
    ProjectStageModule,
    StageModule,
    TaskModule,
    UserCompanyModule,
    UserModule,
    UserProjectModule,
    TaskStageUserModule,
  ],
  controllers: [
    AppController,
    ProjectRoleController,
    TaskPriorityController,
    TaskStatusController,
  ],
  providers: [AppService],
})
export class AppModule {}
