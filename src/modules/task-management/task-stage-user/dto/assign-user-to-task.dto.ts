import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AssignUserToTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'user',
    type: 'string',
    example: '123',
    description: 'User to be assigned',
  })
  user: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'task',
    type: 'string',
    example: '123',
    description: 'Task to be assigned at',
  })
  task: Types.ObjectId;
}
