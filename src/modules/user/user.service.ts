import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Создать пользователя
   * @param {createUserDto} CreateUsersDto - схема создания
   */
  async createUser(createUsersDto: CreateUserDto): Promise<User> {
    const createdUsers = new this.userModel(createUsersDto);
    return createdUsers.save();
  }

  /**
   * Получить пользователя
   * @returns {{ username: string, email: string}} - данные пользователя
   */
  async geAllUsers(): Promise<User[]> {
    console.debug('hello!');
    return await this.userModel.find({}, 'username email', { lean: true });
  }

  /**
   * Получить пользователя
   * @param {userId} string - id пользователя
   * @returns {{ username: string, email: string}} - данные пользователя
   */
  async getUser(userId: string): Promise<UserDocument> {
    const result = await this.userModel.findOne(
      { _id: userId },
      '-_id username email',
      { lean: true },
    );
    return result;
  }

  /**
   * Получить пользователя по имени
   * @param {username} string - схема обновления
   * @returns {{ username: string}} - данные пользователя
   */
  async findUserByName(username: string): Promise<UserDocument> {
    const result = await this.userModel.findOne(
      { username },
      'username password email',
      {
        lean: true,
      },
    );
    //console.log({ result });
    return result;
  }

  /**
   * Обновить пользователя
   * @param {userId} string - id пользователя
   * @param {updateUsersDto} UpdateUsersDto - схема обновления
   */
  async updateUser(userId: string, updateUsersDto: UpdateUserDto) {
    // const existingUser = await this.usersModel.findByIdAndUpdate(userId, updateUsersDto, { new: true });
    // if (!existingUser) {
    //     throw new NotFoundException(`User #${userId} not found`);
    // }
    const updateUser = await this.userModel.updateOne(
      { _id: userId },
      updateUsersDto,
    );
    if (!updateUser.modifiedCount && !updateUser.matchedCount) {
      throw new NotFoundException(`User #${userId} not found`);
    }
  }

  /**
   * Удалить пользователя
   * @param {userId} string - id пользователя
   */
  async deleteUser(userId: string) {
    const deletedUser = await this.userModel.deleteOne({ _id: userId });
    if (!deletedUser.deletedCount) {
      throw new NotFoundException(`User #${userId} not found`);
    }
  }
}
