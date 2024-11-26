import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectStage, ProjectStageDocument } from './project-stage.schema';
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
  async addStageToProject(createProjectStageDto: CreateProjectStageDto) {
    const addedStage = new this.projectStageModel(createProjectStageDto);
    await addedStage.save();
  }

  /**
   *
   * @param projectId
   * @returns
   */
  async getAllStagesOfProject(projectId: string) {
    return this.projectStageModel
      .find({ project: projectId })
      .populate('project')
      .populate('stage')
      .lean(true);
  }

  async getFirstStageInOrder(projectId: string) {
    return this.projectStageModel.findOne(
      { project: projectId, order: 0 },
      'stage',
      {
        lean: true,
      },
    );
  }

  /**
   *
   * @param {{stage: string}}
   */
  async deleteStageFromProject(stage: string, project: string) {
    const deletedStage = await this.projectStageModel.deleteOne({
      stage,
      project,
    });
    if (!deletedStage.deletedCount) {
      throw new NotFoundException(`Stage #${stage} not found`);
    }
  }
}
