import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectStage, ProjectStageDocument } from './projectStage.schema';
import { Model } from 'mongoose';
import { CreateProjectStageDto } from './dto/create-project-stage.dto';

@Injectable()
export class ProjectStageService {
  constructor(
    @InjectModel(ProjectStage.name)
    private projectStageModel: Model<ProjectStageDocument>,
  ) {}

  /**
   *
   * @param createProjectStageDto
   * @returns
   */
  async addStageToProject(
    createProjectStageDto: CreateProjectStageDto,
  ): Promise<ProjectStage> {
    const addedStage = new this.projectStageModel(createProjectStageDto);
    return await addedStage.save();
  }
}
