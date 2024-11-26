import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserCompany, UserCompanyDocument } from './company-user.schema';
import { Model } from 'mongoose';
import { CreateUserCompanyDto } from './dto/create-company-user.dto';

@Injectable()
export class UserCompanyService {
  constructor(
    @InjectModel(UserCompany.name)
    private userCompanyModel: Model<UserCompanyDocument>,
  ) {}

  /**
   * Assign user to company
   * @param {createUserCompanyDto} CreateUserCompanyDto - схема создания
   */
  async assignUserToCompany(
    createUserCompanyDto: CreateUserCompanyDto,
  ): Promise<UserCompany> {
    const createdUserCompany = new this.userCompanyModel(createUserCompanyDto);
    return createdUserCompany.save();
  }

  /**
   * Get all users of company
   * @param {company} string - ID компании
   */
  async getAllUsersOfCompany(company: string): Promise<UserCompany[]> {
    return await this.userCompanyModel
      .find({ company }, '-_id user company role')
      .populate('user', '-password -createdAt -updatedAt')
      .populate('company', '-createdAt -updatedAt')
      .lean(true);
  }

  /**
   *
   * @param userId
   */
  async deleteUserFromCompany(userId: string) {
    const deletedUser = await this.userCompanyModel.deleteOne({ user: userId });
    if (!deletedUser.deletedCount) {
      throw new NotFoundException(`User #${userId} not found`);
    }
  }
}
