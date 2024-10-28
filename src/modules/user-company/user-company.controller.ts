import { Body, Controller, Post } from '@nestjs/common';
import { UserCompanyService } from './user-company.service';
import { CreateUserCompanyDto } from './dto/create-user-company.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

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
}
