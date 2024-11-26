import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserProject, UserProjectDocument } from './project-user.schema';
import { Model } from 'mongoose';
import { CreateUserProjectDto } from './dto/create-user-project.dto';

@Injectable()
export class UserProjectService {
  constructor(
    @InjectModel(UserProject.name)
    private userProjectModel: Model<UserProjectDocument>,
  ) {}

  /**
   * Get all users of project
   * @returns {{ user: string, project: string, position: string, role: string, assigned_at: Date}} - данные пользователя
   */
  async getAllUsersOfProject(projectId: string): Promise<UserProject[]> {
    return this.userProjectModel
      .find({ project: projectId })
      .populate('user', '-password -createdAt -updatedAt')
      .lean(true);
  }

  /**
   *
   * @param createUserProjectDto
   * @returns
   */
  async addUserToProject(createUserProjectDto: CreateUserProjectDto) {
    const addedUser = new this.userProjectModel(createUserProjectDto);
    await addedUser.save();
  }

  /**
   *
   * @param userId
   */
  async deleteUserFromProject(userId: string) {
    const deletedUser = await this.userProjectModel.deleteOne({ user: userId });
    if (!deletedUser.deletedCount) {
      throw new NotFoundException(`User #${userId} not found`);
    }
  }

  /**
   *
   * @param userId
   * @param projectId
   * @returns
   */
  async findUserRole(
    userId: string,
    projectId: string,
  ): Promise<UserProject | null> {
    const userProject = await this.userProjectModel.findOne(
      { user: userId, project: projectId },
      '',
      { lean: true },
    );
    return userProject;
  }
}
