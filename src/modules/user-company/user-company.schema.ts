import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserCompanyDocument = HydratedDocument<UserCompany>;

@Schema({ timestamps: true })
export class UserCompany {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Company' })
  company: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Position' })
  position: Types.ObjectId;
}

export const UserCompanySchema = SchemaFactory.createForClass(UserCompany);
