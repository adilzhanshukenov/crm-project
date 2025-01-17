import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './project.schema';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { Stage, StageDocument } from '../stage/stage.schema';
import { CreateStageDto } from '../stage/dto/create-stage.dto';
import {
  ProjectStage,
  ProjectStageDocument,
} from '../project-stage/project-stage.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(Stage.name) private stageModel: Model<StageDocument>,
    @InjectModel(ProjectStage.name)
    private projectStageModel: Model<ProjectStageDocument>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    await createdProject.save();

    // Step 2: Ensure default stages exist
    const todoStage = await this.findOrCreateStage({
      name: 'To-Do',
      description: 'To-Do stage',
      company: createProjectDto.company._id,
    });

    const doneStage = await this.findOrCreateStage({
      name: 'Done',
      description: 'Done stage',
      company: createProjectDto.company._id,
    });

    if (!todoStage || !doneStage) {
      throw new Error(
        'Default stages (To-Do, Done) are not found in the database',
      );
    }

    const projectStages = [
      {
        project: createdProject._id.toString(),
        stage: todoStage._id.toString(),
        order: 0,
      },
      {
        project: createdProject._id.toString(),
        stage: doneStage._id.toString(),
        order: 1,
      },
    ];

    await this.projectStageModel.insertMany(projectStages);

    return createdProject;
  }

  async getProjectById(projectId: string): Promise<Project> {
    return await this.projectModel.findOne(
      { _id: projectId },
      'name description status',
      { lean: true },
    );
  }

  async getAllProjectsOfCompany(companyID: string): Promise<Project[]> {
    return await this.projectModel.find(
      { company: companyID },
      'name description',
      { lean: true },
    );
  }

  // Helper: Find or Create a Stage
  async findOrCreateStage(createStageDto: CreateStageDto): Promise<Stage> {
    let stage = await this.stageModel.findOne(
      { name: createStageDto.name },
      '',
      { lean: true },
    );
    if (!stage) {
      stage = new this.stageModel(createStageDto);
      await stage.save();
    }
    return stage;
  }
}
