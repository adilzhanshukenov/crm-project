import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserCompanyDocument = HydratedDocument<UserCompany>;

@Schema()
export class UserCompany {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Company' })
  companyId: Types.ObjectId;

  @Prop()
  role: string;
}

export const UserCompanySchema = SchemaFactory.createForClass(UserCompany);
