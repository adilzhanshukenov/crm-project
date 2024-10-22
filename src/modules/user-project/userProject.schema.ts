import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserProjectDocument = HydratedDocument<UserProject>;

@Schema({ timestamps: true })
export class UserProject {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  project: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Position' }) //добавить схему
  position?: Types.ObjectId;

  @Prop({ enum: ['Admin', 'Manager', 'Worker'], default: 'Worker' })
  role: string;

  @Prop({ default: Date.now() })
  assigned_at: Date;
}

export const UserProjectSchema = SchemaFactory.createForClass(UserProject);
