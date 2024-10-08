import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/user-login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from '../models/users/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Users.name)
    private readonly usersModel: Model<UsersDocument>,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    // Replace this logic with your user validation (like from a database)
    const user = { username: 'test', password: 'test123' }; // Mocked user

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (passwordIsValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userInfo: UserLoginDto) {
    // const payload = { username: userInfo.username, sub: userInfo.userId };
    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
    const user = await this.usersModel.findOne(
      { username: userInfo.username },
      'password',
      { lean: true },
    );
    if (!user) {
      throw new NotFoundException('The user not found');
    }
  }
}
