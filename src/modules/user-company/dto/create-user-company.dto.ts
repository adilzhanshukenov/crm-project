import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserCompanyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Ivan',
    description: 'Username',
  })
  readonly userId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Ivan',
    description: 'Username',
  })
  readonly companyId: Types.ObjectId;

  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'Manager',
    description: 'Company role of the user',
  })
  readonly role: string;
}
