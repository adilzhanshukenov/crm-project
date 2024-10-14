import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './models/user/user.module';
import { AuthModule } from './models/auth/auth.module';
import { CompanyModule } from './models/company/company.module';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      ////load: [config]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        // %D0%91%D0%B5%D1%80%D0%B5%D0%BC MONGODB_URI %D0%B8%D0%B7 .env
      }),
      // useFactory: async (configService: ConfigService) => {
      //   console.log('MongooseModule');
      //   return {
      //     uri: configService.get<string>('MONGO_URI'),
      //   };
      // },

      // // inject: [ConfigService],
      // useFactory: () => ({
      //   uri: this.configService.get<string>('MONGO_URI');//'mongodb+srv://shukenovadilzhan:rzKWvJfKOi12o3JD@cluster-adil.6mp2f.mongodb.net/crmproject',
      // }),
    }),
    UserModule,
    CompanyModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
