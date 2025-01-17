import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskStageUserDto } from './create-task-stage-user.dto';

export class UpdateTaskStageUserDto extends PartialType(
  CreateTaskStageUserDto,
) {}
