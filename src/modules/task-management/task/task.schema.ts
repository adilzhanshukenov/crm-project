import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { TaskStatus } from '../enums/taskstatus/taskStatus.enum';
import { TaskPriority } from '../enums/taskPriority/taskPriority.enum';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: string;

  @Prop()
  due_date: Date;

  @Prop({ enum: TaskPriority, default: TaskPriority.MEDIUM })
  priority: string;

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  project: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Stage' })
  stage: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
