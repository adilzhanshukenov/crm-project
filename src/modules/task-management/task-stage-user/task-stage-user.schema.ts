import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TaskStageUserDocument = HydratedDocument<TaskStageUser>;

@Schema({ timestamps: true })
export class TaskStageUser {
  @Prop({ type: Types.ObjectId, ref: 'Task' })
  task: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Stage' })
  stage: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  user?: Types.ObjectId;
}

export const TaskStageUserSchema = SchemaFactory.createForClass(TaskStageUser);
