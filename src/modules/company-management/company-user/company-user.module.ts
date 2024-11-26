import { Module } from '@nestjs/common';
import { UserCompanyService } from './company-user.service';
import { UserCompanyController } from './company-user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCompany, UserCompanySchema } from './company-user.schema';

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
