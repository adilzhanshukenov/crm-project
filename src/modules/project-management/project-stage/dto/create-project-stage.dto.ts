import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProjectStageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'project',
    type: 'string',
    example: '1234',
    description: 'Project ID',
  })
  project: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'stage',
    type: 'string',
    example: '1234',
    description: 'Stage ID',
  })
  stage: Types.ObjectId;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'order',
    type: 'number',
    example: '1',
    description: 'Order of the stage',
  })
  order: number;
}
