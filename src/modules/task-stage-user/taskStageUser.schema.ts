import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class TaskStageUser {
  @Prop({ type: Types.ObjectId, ref: 'TaskStage' })
  taskStage: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user?: Types.ObjectId;
}
