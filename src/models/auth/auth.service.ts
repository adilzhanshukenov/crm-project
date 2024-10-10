import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/user-login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from '../users/users.schema';
import { Model, Types } from 'mongoose';
import { jwtConstants } from './auth.constants';
import { UsersService } from '../users/users.service';

// type AuthInput = { username: string; password: string };
type SignInData = { userId: Types.ObjectId; username: string };
type AuthResult = {
  access_token: string;
  userId: Types.ObjectId;
  username: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Users.name)
    private readonly usersModel: Model<UsersDocument>,
    private usersService: UsersService,
  ) {}

  async authenticate(input: UserLoginDto): Promise<AuthResult> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException('The user is not found.');
    }
    return this.login(user);
  }

  async validateUser(input: UserLoginDto): Promise<SignInData> {
    const user = await this.usersService.findUserByName(input.username);
    // if (user && user.password === input.password) {
    //   return {
    //     userId: user._id,
    //     username: user.username,
    //   };
    // }

    const passwordIsValid = await bcrypt.compare(input.password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('The password is incorrect');
    }
    return { userId: user._id, username: user.username };
  }

  async login(userInfo: SignInData) {
    const user = await this.usersModel.findOne(
      { username: userInfo.username },
      'password',
      { lean: true },
    );
    if (!user) {
      throw new NotFoundException('The user not found');
    }

    const payload = {
      sub: userInfo.username + user._id,
      username: userInfo.username,
      _id: user._id,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
    });

    return {
      access_token,
      username: userInfo.username,
      userId: user._id,
    };
  }
}
