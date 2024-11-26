import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserCompanyService } from './company-user.service';
import { CreateUserCompanyDto } from './dto/create-company-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('user-company')
export class UserCompanyController {
  constructor(private readonly userCompanyService: UserCompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Assign user to company' })
  @ApiBody({
    type: CreateUserCompanyDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The user was assigned successfully',
  })
  async assignUserToCompany(
    @Body() createUserCompanyDto: CreateUserCompanyDto,
  ) {
    await this.userCompanyService.assignUserToCompany(createUserCompanyDto);
  }

  @Get(':companyId')
  @ApiOperation({ summary: 'Get All Users of Company' })
  @ApiParam({
    name: 'companyId',
    type: 'string',
    example: '123',
    description: 'ID of a company',
  })
  @ApiResponse({
    status: 201,
    description: 'All users are shown',
  })
  async getAllUsersOfCompany(@Param('companyId') companyId: string) {
    return this.userCompanyService.getAllUsersOfCompany(companyId);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user from company' })
  @ApiParam({
    name: 'userId',
    type: 'string',
    example: '123',
    description: 'ID of a user',
  })
  @ApiResponse({
    status: 200,
    description: 'The user was successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'The user was not found',
  })
  async deleteUserFromCompany(@Param('userId') userId: string) {
    return this.userCompanyService.deleteUserFromCompany(userId);
  }
}
