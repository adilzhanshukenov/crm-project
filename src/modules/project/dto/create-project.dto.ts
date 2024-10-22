import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'CRM project',
    description: 'Project Name',
  })
  readonly name: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'CRM project to track progres of employees',
    description: 'Description of the project',
  })
  readonly description: string;

  @IsDate()
  //@IsNotEmpty()
  @ApiProperty({
    //type: 'Date',
    description: 'Start date of the project',
  })
  readonly start_date: Date;

  @IsDate()
  @ApiProperty({
    //type: 'Date',
    description: 'End date of the project',
  })
  readonly end_date: Date;

  @IsString()
  @ApiProperty({
    type: 'date',
    example: 'Active',
    description: 'Status of the project',
  })
  readonly status: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Company of the project',
  })
  readonly company: string;
}
