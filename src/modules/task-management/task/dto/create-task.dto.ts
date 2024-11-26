import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'name',
    type: 'string',
    example: 'Implement feature 1',
    description: 'Name of the task',
  })
  readonly name: string;

  @IsString()
  @ApiProperty({
    name: 'description',
    type: 'string',
    example: 'Implement feature 1 and show the results',
    description: 'Description of the task',
  })
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'status',
    type: 'string',
    example: 'In progress',
    description: 'Status of the task',
  })
  readonly status: string;

  @IsDateString()
  @ApiProperty({
    name: 'due_date',
    type: 'Date',
    example: '12-04-2005',
    description: 'Due date of the task',
  })
  due_date: string;

  @IsString()
  @ApiProperty({
    name: 'priority',
    type: 'string',
    example: 'High',
    description: 'Priority of the task',
  })
  readonly priority: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'project',
    type: 'string',
    example: '123',
    description: 'Project of the task',
  })
  readonly project: Types.ObjectId;

  @IsString()
  @ApiProperty({
    name: 'stageId',
    type: 'string',
    example: '123',
    description: 'Id of the stage',
  })
  readonly stage: Types.ObjectId;
}
