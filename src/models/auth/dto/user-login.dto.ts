import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'username1',
    description: 'username of the user',
    type: 'string',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'test123',
    description: 'password of the user',
    type: 'string',
  })
  password: string;
}
