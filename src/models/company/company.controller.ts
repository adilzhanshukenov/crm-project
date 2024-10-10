import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

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
    description: 'The company was succesfully created.',
  })
  async createUser(@Body() createCompanyDto: CreateCompanyDto) {
    await this.companyService.createCompany(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Companies' })
  @ApiResponse({
    status: 201,
    description: 'All companies are found.',
  })
  async getAllCompanies() {
    return this.companyService.getAllCompanies();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Company By Id' })
  @ApiParam({
    name: 'id', // Name of the parameter
    type: 'string', // Type of the parameter
    description: 'The ID of the company.', // Description
    example: '123', // Example for Swagger
  })
  @ApiResponse({
    status: 200,
    description: 'Company was found.',
  })
  async getCompanyById(@Param('id') companyId: string) {
    return this.companyService.getCompanyById(companyId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update company' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Update company with new body.',
    example: '123',
  })
  @ApiBody({
    type: UpdateCompanyDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The company was updated.',
  })
  async updateCompany(
    @Param('id') companyId: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.updateCompany(companyId, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete company by id',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Delete company by id.',
    example: '123',
  })
  @ApiResponse({
    status: 200,
    description: 'The company was deleted.',
  })
  async deleteCompany(@Param('id') companyId: string) {
    return this.companyService.deleteCompany(companyId);
  }
}
