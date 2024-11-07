import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  @ApiOperation({ summary: 'Add position' })
  @ApiBody({
    type: CreatePositionDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The position was succesfully added',
  })
  async addPosition(@Body() createPositionDto: CreatePositionDto) {
    await this.positionService.addPosition(createPositionDto);
  }

  @Get(':companyId')
  @ApiOperation({ summary: 'Get all positions of company' })
  @ApiParam({
    name: 'company', // Name of the parameter
    type: 'string', // Type of the parameter
    description: 'The ID of a company', // Description
    example: '123', // Example for Swagger
  })
  @ApiResponse({
    status: 201,
    description: 'All positions of company are shown',
  })
  async getPositionsOfCompany(@Param('companyId') company: string) {
    return await this.positionService.getPositionsOfCompany(company);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update position' })
  @ApiParam({
    name: 'positionId',
    type: 'string',
    description: 'Update position',
    example: '123',
  })
  @ApiResponse({
    status: 200,
    description: 'The position was succesfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'The position not found',
  })
  async updatePosition(
    @Param('id') positionId: string,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    await this.positionService.updatePosition(positionId, updatePositionDto);
  }
}
