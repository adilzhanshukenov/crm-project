import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserProjectService } from './project-user.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateUserProjectDto } from './dto/create-user-project.dto';

@Controller('project-user')
export class UserProjectController {
  constructor(private readonly userProjectService: UserProjectService) {}

  @Get(':projectId')
  @ApiOperation({ summary: 'Get All Users Of Project' })
  @ApiParam({
    name: 'projectId',
    type: 'string',
    example: '123',
    description: 'Id of the project',
  })
  @ApiResponse({
    status: 201,
    description: 'All users are shown',
  })
  async getAllUsersOfProject(@Param('projectId') projectId: string) {
    return await this.userProjectService.getAllUsersOfProject(projectId);
  }

  @Post()
  @ApiOperation({ summary: 'Add user to project' })
  @ApiBody({
    type: CreateUserProjectDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The user was succesfully added',
  })
  async addUserToProject(@Body() createUserProjectDto: CreateUserProjectDto) {
    await this.userProjectService.addUserToProject({
      ...createUserProjectDto,
    });
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user from project' })
  @ApiParam({
    name: 'userId',
    type: 'string',
    example: '123',
    description: 'ID of the user',
  })
  @ApiResponse({
    status: 200,
    description: 'The user was succesfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'The user was not found',
  })
  async deleteUserFromProject(@Param('userId') user: string) {
    await this.userProjectService.deleteUserFromProject(user);
  }
}
