import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';
import { jwtConstants } from './auth.constants';
import { PassportAuthController } from './passport-auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
  ],
  providers: [UserService, AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController, PassportAuthController],
})
export class AuthModule {}
