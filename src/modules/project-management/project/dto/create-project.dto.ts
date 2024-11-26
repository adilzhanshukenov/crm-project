import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'name',
    type: 'string',
    example: 'CRM project',
    description: 'Project Name',
  })
  readonly name: string;

  @IsString()
  @ApiProperty({
    name: 'decription',
    type: 'string',
    example: 'CRM project to track progres of employees',
    description: 'Description of the project',
  })
  readonly description: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'start_date',
    type: 'Date',
    description: 'Start date of the project',
  })
  readonly start_date: string;

  @IsDateString()
  @ApiProperty({
    name: 'end_date',
    type: 'Date',
    description: 'End date of the project',
  })
  readonly end_date: string;

  @IsString()
  @ApiProperty({
    name: 'status',
    type: 'string',
    example: 'Active',
    description: 'Status of the project',
  })
  readonly status: string;

  @IsString()
  @ApiProperty({
    name: 'company',
    type: 'string',
    example: '123',
    description: 'Company of the project',
  })
  readonly company: Types.ObjectId;
}
