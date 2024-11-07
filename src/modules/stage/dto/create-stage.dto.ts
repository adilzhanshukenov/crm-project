import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateStageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'In progress',
    description: 'Name of the stage',
  })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'This stage represents in progress status',
    description: 'Description of the stage',
  })
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: '123',
    description: 'ID of a company',
  })
  readonly company: Types.ObjectId;
}
