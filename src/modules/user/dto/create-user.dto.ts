import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Ivan',
    description: 'Username',
  })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    type: 'string',
    example: 'qwerty123',
    description: 'Password',
  })
  readonly password: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'abc@email.com',
    description: 'Email',
  })
  readonly email: string;
}
