import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/user.schema';
import { Model, Types } from 'mongoose';
import { jwtConstants } from './auth.constants';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

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
    @InjectModel(User.name)
    private usersModel: Model<UserDocument>,
    private usersService: UserService,
  ) {}

  async register(registerUserDto: CreateUserDto): Promise<User> {
    const { username, password, email } = registerUserDto;

    // Check if the user already exists
    const existingUser = await this.usersModel.findOne({ username });
    if (existingUser) {
      throw new Error('User with this username already exists');
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the user
    const newUser = new this.usersModel({
      username,
      password: hashedPassword,
      email,
    });

    return newUser.save();
  }

  async authenticate(username: string, password: string): Promise<AuthResult> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('The user is not found.');
    }
    return this.login(user);
  }

  async validateUser(username: string, password: string): Promise<SignInData> {
    const user = await this.usersService.findUserByName(username);
    // const user = await this.usersModel.findOne({ username }, 'username', {
    //   lean: true,
    // });

    // if (user && user.password === password) {
    //   return {
    //     userId: user._id,
    //     username: user.username,
    //   };
    // }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('The password is incorrect');
    }
    return { userId: user._id, username: user.username };
  }

  //Login to account and generate access token
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

    //Generate access token
    const access_token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
    });

    return {
      access_token,
      username: userInfo.username,
      userId: user._id,
    };
  }

  //Get User Profile
  async getUserProfile(username: string) {
    return this.usersService.findUserByName(username);
  }
}
