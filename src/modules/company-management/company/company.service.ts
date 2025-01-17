import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from './company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Position, PositionDocument } from '../position/position.schema';
import {
  UserCompany,
  UserCompanyDocument,
} from '../company-user/company-user.schema';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    @InjectModel(Position.name) private positionModel: Model<PositionDocument>,
    @InjectModel(UserCompany.name)
    private userCOmpanyMddel: Model<UserCompanyDocument>,
  ) {}

  /**
   * Создать компанию
   * @param {createCompanyDto} CreateCompanyDto - схема создания
   */
  async createCompany(createCompanyDto: CreateCompanyDto) {
    const createdCompany = new this.companyModel(createCompanyDto);
    await createdCompany.save();
    const ownerPosition = new this.positionModel({
      name: 'Owner',
      description: 'Owner of company',
      company: createdCompany._id.toString(),
    });

    await ownerPosition.save();
  }

  /**
   * Получить все компании
   * @returns {{ name: string, address: string, industry: string}} - данные о компании
   */
  async getAllCompanies(): Promise<Company[]> {
    return this.companyModel.find({}, 'name address industry', {
      lean: true,
    });
  }

  /**
   * Получить компанию по id
   * @param {companyId} string - Id компании
   * @returns {{ name: string, address: string, industry: string}} - данные о компании
   */
  async getCompanyById(companyId: string): Promise<CompanyDocument> {
    return await this.companyModel.findOne(
      { _id: companyId },
      'name address industry',
      { lean: true },
    );
  }

  /**
   * Обновить компанию по id
   * @param {companyId} string - Id компании
   * @param {updateCompanyDto} UpdateCompanyDto - Id компании
   * @returns {{ name: string, address: string, industry: string}} - данные о компании
   */
  async updateCompany(companyId: string, updateCompanyDto: UpdateCompanyDto) {
    const updatedCompany = await this.companyModel.updateOne(
      { _id: companyId },
      updateCompanyDto,
    );
    if (!updatedCompany.modifiedCount && !updatedCompany.matchedCount) {
      throw new NotFoundException(`The company #${companyId} was not found`);
    }
  }

  /**
   * Удалить компанию по id
   * @param {companyId} string - Id компании
   */
  async deleteCompany(companyId: string) {
    const deleteCompany = await this.companyModel.deleteOne({ _id: companyId });
    if (!deleteCompany.deletedCount) {
      throw new NotFoundException(`'The company #${companyId} was not found.'`);
    }
  }
}
