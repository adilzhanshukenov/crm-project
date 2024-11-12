import { Module } from '@nestjs/common';
import { UserProjectService } from './user-project.service';
import { UserProjectController } from './user-project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProject, UserProjectSchema } from './userProject.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserProject.name, schema: UserProjectSchema },
    ]),
  ],
  providers: [UserProjectService],
  controllers: [UserProjectController],
})
export class UserProjectModule {}
