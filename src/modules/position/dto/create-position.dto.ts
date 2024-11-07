import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePositionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Developer',
    description: 'Name of the position',
  })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Tester',
    description: 'Description of the position',
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
