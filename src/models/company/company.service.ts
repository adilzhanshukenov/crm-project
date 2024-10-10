import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from './company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  /**
   * Создать компанию
   * @param {createCompanyDto} CreateCompanyDto - схема создания
   */
  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const createdCompany = new this.companyModel(createCompanyDto);
    return createdCompany.save();
  }

  /**
   * Получить все компании
   * @returns {{ name: string, address: string, industry: string}} - данные о компании
   */
  async getAllCompanies(): Promise<Company[]> {
    return await this.companyModel.find({}, 'name address industry', {
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
    const updatedCompany = this.companyModel.updateOne(
      { _id: companyId },
      updateCompanyDto,
    );
    if (
      !(await updatedCompany).modifiedCount &&
      !(await updatedCompany).matchedCount
    ) {
      throw new NotFoundException(`The company #${companyId} was not found`);
    }
  }

  /**
   * Удалить компанию по id
   * @param {companyId} string - Id компании
   */
  async deleteCompany(companyId: string) {
    const deleteCompany = this.companyModel.deleteOne({ _id: companyId });
    if (!(await deleteCompany).deletedCount) {
      throw new NotFoundException(`'The company #${companyId} was not found.'`);
    }
  }
}
