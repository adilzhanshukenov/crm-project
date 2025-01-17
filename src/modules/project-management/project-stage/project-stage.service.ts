import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectStage, ProjectStageDocument } from './project-stage.schema';
import { Model } from 'mongoose';
import { CreateProjectStageDto } from './dto/create-project-stage.dto';
import { Stage, StageDocument } from '../stage/stage.schema';

@Injectable()
export class ProjectStageService {
  constructor(
    @InjectModel(ProjectStage.name)
    private projectStageModel: Model<ProjectStageDocument>,
    @InjectModel(Stage.name)
    private stageModel: Model<StageDocument>,
  ) {}

  /**
   *
   * @param createProjectStageDto
   * @returns
   */
  async addStageToProject(createProjectStageDto: CreateProjectStageDto) {
    // Find the "Done" stage and increment its order

    const stageFound: Stage = await this.stageModel.findOne({ name: 'Done' });

    const doneProjectStage = await this.projectStageModel.findOne({
      project: createProjectStageDto.project,
      stage: stageFound._id.toString(),
    });

    doneProjectStage.order += 1;
    await doneProjectStage.save();

    // Insert the new stage before "Done"
    const newProjectStage = new this.projectStageModel({
      project: createProjectStageDto.project,
      stage: createProjectStageDto.stage,
      default_user: createProjectStageDto.default_user,
      order: doneProjectStage.order - 1,
    });
    await newProjectStage.save();
  }

  /**
   *
   * @param projectId
   * @returns
   */
  async getAllStagesOfProject(projectId: string) {
    return this.projectStageModel
      .find({ project: projectId })
      .populate('project stage default_user')
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
