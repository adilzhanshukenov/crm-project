import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({
    enum: ['Pending', 'In Progress', 'Completed', 'Blocked'],
    default: 'Pending',
  })
  status: string;

  @Prop()
  due_date: Date;

  @Prop({ enum: ['Low', 'Medium', 'High'], default: 'Medium' })
  priority: string;

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  project: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
