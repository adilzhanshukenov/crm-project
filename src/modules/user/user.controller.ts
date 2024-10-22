import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PassportJwtAuthGuard } from '../auth/guards/passport-jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The user was succesfully created',
  })
  async createUser(@Body() createUsersDto: CreateUserDto) {
    await this.userService.createUser(createUsersDto);
  }

  @UseGuards(PassportJwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({
    status: 201,
    description: 'All users are shown',
  })
  async geAllUsers() {
    return this.userService.geAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find User By Id' })
  @ApiParam({
    name: 'id', // Name of the parameter
    type: 'string', // Type of the parameter
    description: 'The ID of the user', // Description
    example: '123', // Example for Swagger
  })
  @ApiResponse({
    status: 201,
    description: 'The user was found',
  })
  async findUserById(@Param('id') userId: string) {
    return this.userService.getUser(userId);
  }

  @Get('byUsername/:username')
  @ApiOperation({ summary: 'Find User By Username' })
  @ApiParam({
    name: 'username', // Name of the parameter
    type: 'string', // Type of the parameter
    description: 'The Username of the user', // Description
    example: 'username1', // Example for Swagger
  })
  @ApiResponse({
    status: 201,
    description: 'The user was found',
  })
  async findUserByUsername(@Param('username') username: string) {
    return this.userService.findUserByName(username);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update User' })
  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The user was succesfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'The user not found',
  })
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(userId, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({
    status: 200,
    description: 'The user was succesfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'The user was not found',
  })
  async deleteUser(@Param('id') userId: string) {
    await this.userService.deleteUser(userId);
  }
}
