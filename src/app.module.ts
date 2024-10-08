import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './models/users/users.module';
import { UsersSchema } from './models/users/users.schema';
import { AuthModule } from './models/auth/auth.module';
import { CompanyModule } from './models/company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
      ////load: [config]
    }),
    MongooseModule.forRootAsync({
      // imports: [ConfigModule],
      // useFactory: async (configService: ConfigService) => {
      //   console.log('MongooseModule')
      //   return ({
      //     uri: 'mongodb://127.0.0.1:27017/crm-project'
      //   })
      // },

      // inject: [ConfigService],
      useFactory: () => ({
        uri: 'mongodb+srv://shukenovadilzhan:rzKWvJfKOi12o3JD@cluster-adil.6mp2f.mongodb.net/crmproject',
      }),
    }),
    UsersModule,
    CompanyModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
