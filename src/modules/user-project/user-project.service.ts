import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserProject, UserProjectDocument } from './userProject.schema';
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
  async getAllUsersOfProject(): Promise<UserProject[]> {
    return this.userProjectModel.find({}, '', { lean: true });
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
}
