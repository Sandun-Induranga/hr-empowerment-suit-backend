import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeavesDocument = Leaves & Document;

@Schema()
export class Leaves {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: true })
  users: string[];

  @Prop({ required: true })
  created_at: Date;
}

export const LeavesSchema = SchemaFactory.createForClass(Leaves);
