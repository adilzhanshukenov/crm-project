import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TaskStageDocument = HydratedDocument<TaskStage>;

@Schema({ timestamps: true })
export class TaskStage {
  @Prop()
  task: Types.ObjectId;

  @Prop()
  projectStage: Types.ObjectId;

  @Prop({ enum: ['New', 'In Progress', 'Completed'], default: 'New' })
  status: string;
}

export const TaskStageSchema = SchemaFactory.createForClass(TaskStage);
