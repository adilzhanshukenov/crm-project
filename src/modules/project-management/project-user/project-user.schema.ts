import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ProjectRole } from '../enums/project-role/project-role.enum';

export type UserProjectDocument = HydratedDocument<UserProject>;

@Schema({ timestamps: true })
export class UserProject {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  project: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Position' }) //добавить схему
  position?: Types.ObjectId;

  @Prop({
    required: true,
    type: String,
    enum: ProjectRole,
    default: ProjectRole.EDITOR,
  })
  role: string;
}

export const UserProjectSchema = SchemaFactory.createForClass(UserProject);
