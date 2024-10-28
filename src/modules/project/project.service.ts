import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './project.schema';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
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
}
