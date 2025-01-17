import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type StageDocument = HydratedDocument<Stage>;

@Schema({ timestamps: true })
export class Stage {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Company' }) // index: true ?
  company?: Types.ObjectId;
}

export const StageSchema = SchemaFactory.createForClass(Stage);
