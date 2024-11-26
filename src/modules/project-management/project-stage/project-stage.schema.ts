import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProjectStageDocument = HydratedDocument<ProjectStage>;

@Schema({ timestamps: true })
export class ProjectStage {
  @Prop({ type: Types.ObjectId, ref: 'Project' })
  project: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Stage' })
  stage: Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  order: number;
}

export const ProjectStageSchema = SchemaFactory.createForClass(ProjectStage);
