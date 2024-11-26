import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: '1234',
    description: 'User ID',
  })
  readonly user: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: '1234',
    description: 'Project ID',
  })
  readonly project: Types.ObjectId;

  @IsString()
  @ApiProperty({
    type: 'string',
    example: '1234',
    description: 'Position of the user',
  })
  readonly position: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: '1234',
    description: 'Role of the user',
  })
  readonly role: string;
}
