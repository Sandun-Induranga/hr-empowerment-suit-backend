import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeavesDocument = Leaves & Document;

@Schema()
export class Leaves {

  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  reason: string;

  @Prop({ required: true })
  day_count: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  status: string;
}

export const LeavesSchema = SchemaFactory.createForClass(Leaves);
