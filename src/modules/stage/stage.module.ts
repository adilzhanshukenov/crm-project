import { Module } from '@nestjs/common';
import { StageService } from './stage.service';
import { StageController } from './stage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Stage, StageSchema } from './stage.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stage.name, schema: StageSchema }]),
  ],
  providers: [StageService],
  controllers: [StageController],
})
export class StageModule {}
