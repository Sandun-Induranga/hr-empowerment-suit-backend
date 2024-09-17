import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema()
export class Attendance {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  status: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
