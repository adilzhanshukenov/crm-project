import { Module } from '@nestjs/common';
import { UserProjectService } from './project-user.service';
import { UserProjectController } from './project-user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProject, UserProjectSchema } from './project-user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserProject.name, schema: UserProjectSchema },
    ]),
  ],
  providers: [UserProjectService],
  controllers: [UserProjectController],
  exports: [UserProjectService],
})
export class UserProjectModule {}
