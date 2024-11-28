import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateTaskStageUserDto {
  @IsString()
  @IsNotEmpty()
  stageId: Types.ObjectId;

  @IsString()
  @IsOptional() // User assignment is optional
  userId?: Types.ObjectId;
}
