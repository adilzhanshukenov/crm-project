import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './users.schema';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  /**
   * Создать пользователя
   * @param {createUsersDto} CreateUsersDto - схема создания
   */
  async createUser(createUsersDto: CreateUsersDto): Promise<Users> {
    const createdUsers = new this.usersModel(createUsersDto);
    return createdUsers.save();
  }

  /**
   * Получить пользователя
   * @returns {{ username: string, email: string}} - данные пользователя
   */
  async geAllUsers(): Promise<Users[]> {
    return await this.usersModel.find({}, 'username email', { lean: true });
  }

  /**
   * Получить пользователя
   * @param {userId} string - id пользователя
   * @returns {{ username: string, email: string}} - данные пользователя
   */
  async getUser(userId: string): Promise<UsersDocument> {
    const result = await this.usersModel.findOne(
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
  async findUserByName(username: string): Promise<UsersDocument> {
    const result = await this.usersModel.findOne(
      { username },
      'username password',
      {
        lean: true,
      },
    );
    console.log({ result });
    return result;
  }

  /**
   * Обновить пользователя
   * @param {userId} string - id пользователя
   * @param {updateUsersDto} UpdateUsersDto - схема обновления
   */
  async updateUser(userId: string, updateUsersDto: UpdateUsersDto) {
    // const existingUser = await this.usersModel.findByIdAndUpdate(userId, updateUsersDto, { new: true });
    // if (!existingUser) {
    //     throw new NotFoundException(`User #${userId} not found`);
    // }
    const updateUser = await this.usersModel.updateOne(
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
    const deletedUser = await this.usersModel.deleteOne({ _id: userId });
    if (!deletedUser.deletedCount) {
      throw new NotFoundException(`User #${userId} not found`);
    }
  }
}
