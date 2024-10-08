import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Create Company' })
  @ApiBody({
    type: CreateCompanyDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The company was succesfully created',
  })
  async createUser(@Body() createCompanyDto: CreateCompanyDto) {
    await this.companyService.createCompany(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Companies' })
  @ApiResponse({
    status: 201,
    description: 'All companies are shown',
  })
  async geAllUsers() {
    return this.companyService.geAllcCompanies();
  }
}
