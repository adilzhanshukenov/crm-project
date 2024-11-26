import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserCompanyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Ivan',
    description: 'Username',
  })
  readonly user: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Ivan',
    description: 'Username',
  })
  readonly company: Types.ObjectId;

  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'Manager',
    description: 'Company role of the user',
  })
  readonly position: Types.ObjectId;

  @IsNumber()
  @ApiProperty({
    name: 'accepted',
    type: 'number',
    example: '0',
    description: 'accepted or not',
  })
  readonly accepted: number;
}
