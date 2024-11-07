import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StageService } from './stage.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';

@Controller('stage')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Post()
  @ApiOperation({ summary: 'Add stage to company' })
  @ApiBody({
    type: CreateStageDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The stage was succesfully added',
  })
  async addStageToCompany(@Body() createStageDto: CreateStageDto) {
    await this.stageService.addStageToCompany(createStageDto);
  }

  @Get(':companyId')
  @ApiOperation({ summary: 'Get All Stages Of Company' })
  @ApiParam({
    name: 'company', // Name of the parameter
    type: 'string', // Type of the parameter
    description: 'The ID of a company', // Description
    example: '123', // Example for Swagger
  })
  @ApiResponse({
    status: 201,
    description: 'All stages of company are shown',
  })
  async getAllStageOfCompany(@Param('companyId') company: string) {
    return await this.stageService.getAllStagesOfCompany(company);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update stage' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id of the stage',
    example: '123',
  })
  @ApiBody({
    type: UpdateStageDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The stage was succesfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'The stage was not found',
  })
  async updateStage(
    @Param('id') stageId: string,
    @Body() updateStageDto: UpdateStageDto,
  ) {
    await this.stageService.updateStage(stageId, updateStageDto);
  }
}
