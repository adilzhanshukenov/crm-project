import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from './company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';

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
   * Получить компанию
   * @returns {{ name: string, address: string, industry: string}} - данные о компании
   */
  async geAllcCompanies(): Promise<Company[]> {
    return await this.companyModel.find({}, 'name address industry', {
      lean: true,
    });
  }
}
