import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ProjectRole } from '../projectrole/enums/ProjectRole.enum';

export type UserProjectDocument = HydratedDocument<UserProject>;

@Schema({ timestamps: true })
export class UserProject {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  project: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Position' }) //добавить схему
  position?: Types.ObjectId;

  @Prop({ type: String, enum: ProjectRole, default: ProjectRole.WORKER })
  role: string;

  @Prop({ type: Date, default: Date.now })
  assigned_at: Date;
}

export const UserProjectSchema = SchemaFactory.createForClass(UserProject);
