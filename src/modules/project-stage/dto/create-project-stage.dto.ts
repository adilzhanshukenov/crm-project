import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProjectStageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'project',
    type: 'string',
    example: '1234',
    description: 'Project ID',
  })
  project: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'stage',
    type: 'string',
    example: '1234',
    description: 'Stage ID',
  })
  stage: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'order',
    type: 'number',
    example: '1234',
    description: 'Order of the stage',
  })
  order: number;
}
