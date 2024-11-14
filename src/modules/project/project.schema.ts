import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  start_date: Date;

  @Prop()
  end_date: Date;

  @Prop({
    enum: ['ACTIVE', 'ON_HOLD', 'COMPLETED'],
    default: 'ACTIVE',
  })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: false, index: true })
  company?: Types.ObjectId;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
