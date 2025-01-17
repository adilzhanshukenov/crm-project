import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTaskStageUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'task',
    type: 'string',
    example: '123',
    description: 'Task ID',
  })
  readonly task: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'stage',
    type: 'string',
    example: '123',
    description: 'Stage ID',
  })
  readonly stage: Types.ObjectId;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'user',
    type: 'string',
    example: '123',
    description: 'User ID',
  })
  readonly user?: Types.ObjectId;
}
