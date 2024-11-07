import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserProjectService } from './user-project.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserProjectDto } from './dto/create-user-project.dto';

@Controller('user-project')
export class UserProjectController {
  constructor(private readonly userProjectService: UserProjectService) {}

  @Get()
  @ApiOperation({ summary: 'Get All Users Of Project' })
  @ApiResponse({
    status: 201,
    description: 'All users are shown',
  })
  async getAllUsersOfProject() {
    return await this.getAllUsersOfProject();
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
    await this.userProjectService.addUserToProject(createUserProjectDto);
  }
}
