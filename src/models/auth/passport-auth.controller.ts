import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/passport-local.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { PassportJwtAuthGuard } from './guards/passport-jwt.guard';

@Controller('auth')
export class PassportAuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({
    status: 200,
    description: 'The record found',
  })
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({
    status: 201,
    description: 'User was registered',
  })
  async register(@Body() registerUserDto: CreateUserDto) {
    const newUser = await this.authService.register(registerUserDto);
    return { message: 'User registered successfully', newUser };
  }

  @UseGuards(PassportJwtAuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get User Info' })
  @ApiResponse({
    status: 200,
    description: 'The record found',
  })
  async getUserProfile(@Request() request) {
    return this.authService.getUserProfile(request.user.username);
  }
}
