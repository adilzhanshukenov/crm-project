import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserCompany, UserCompanyDocument } from './user-company.schema';
import { Model } from 'mongoose';
import { CreateUserCompanyDto } from './dto/create-user-company.dto';

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

  async getAllUsersOfCompany(companyId: string): Promise<UserCompany[]> {
    return await this.userCompanyModel.find(
      { companyId },
      '-_id userId companyId role',
      {
        lean: true,
      },
    );
  }
}
