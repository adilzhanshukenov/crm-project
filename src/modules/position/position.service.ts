import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Position, PositionDocument } from './position.schema';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionService {
  constructor(
    @InjectModel(Position.name) private positionModel: Model<PositionDocument>,
  ) {}

  /**
   *
   * @returns
   */
  async getPositionsOfCompany(company: string) {
    return await this.positionModel.find({ company }, 'name description', {
      lean: true,
    });
  }

  /**
   *
   * @param createPositionDto
   * @returns
   */
  async addPosition(createPositionDto: CreatePositionDto): Promise<Position> {
    const createdPosition = new this.positionModel(createPositionDto);
    return await createdPosition.save();
  }

  /**
   *
   * @param position
   * @param updatePositionDto
   */
  async updatePosition(
    positionId: string,
    updatePositionDto: UpdatePositionDto,
  ) {
    const updatedPosition = await this.positionModel.updateOne(
      { _id: positionId },
      updatePositionDto,
    );
    if (!updatedPosition.modifiedCount && !updatedPosition.matchedCount) {
      throw new NotFoundException(`Position #${positionId} not found`);
    }
  }
}
