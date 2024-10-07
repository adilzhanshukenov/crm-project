import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsersDto {

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
    @ApiProperty({
      type: 'string',
      example: 'qwerty123',
      description: 'Password',
    })
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
      type: 'string',
      example: 'abc@email.com',
      description: 'Email',
    })
    readonly email: string;

  }