import { Module } from '@nestjs/common';
import { UserCompanyService } from './user-company.service';
import { UserCompanyController } from './user-company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCompany, UserCompanySchema } from './user-company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserCompany.name, schema: UserCompanySchema },
    ]),
  ],
  providers: [UserCompanyService],
  controllers: [UserCompanyController],
})
export class UserCompanyModule {}
