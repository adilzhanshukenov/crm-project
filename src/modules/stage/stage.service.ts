import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Stage, StageDocument } from './stage.schema';
import { Model } from 'mongoose';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';

@Injectable()
export class StageService {
  constructor(
    @InjectModel(Stage.name) private stageModel: Model<StageDocument>,
  ) {}

  /**
   *
   * @returns {{name: string, description: string}}
   */
  async getAllStagesOfCompany(company: string): Promise<Stage[]> {
    return await this.stageModel.find({ company }, 'name description', {
      lean: true,
    });
  }

  /**
   *
   * @param createStageDto
   * @returns
   */
  async addStageToCompany(createStageDto: CreateStageDto): Promise<Stage> {
    const createdStage = new this.stageModel(createStageDto);
    return await createdStage.save();
  }

  async updateStage(stageId: string, updateStageDto: UpdateStageDto) {
    const updatedStage = await this.stageModel.updateOne(
      { _id: stageId },
      updateStageDto,
    );
    if (!updatedStage.matchedCount && !updatedStage.modifiedCount) {
      throw new NotFoundException(`Stage #${stageId} was not found`);
    }
  }
}
