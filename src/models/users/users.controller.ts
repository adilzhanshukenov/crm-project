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
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiBody({
    type: CreateUsersDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The user was succesfully created',
  })
  async createUser(@Body() createUsersDto: CreateUsersDto) {
    await this.usersService.createUser(createUsersDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({
    status: 201,
    description: 'All users are shown',
  })
  async geAllUsers() {
    return this.usersService.geAllUsers();
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
    return this.usersService.getUser(userId);
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
    return this.usersService.findUserByName(username);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update User' })
  @ApiBody({
    type: UpdateUsersDto,
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
    @Body() updateUsersDto: UpdateUsersDto,
  ) {
    await this.usersService.updateUser(userId, updateUsersDto);
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
    await this.usersService.deleteUser(userId);
  }
}
