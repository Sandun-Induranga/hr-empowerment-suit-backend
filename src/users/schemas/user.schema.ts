import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateEmployeeDto } from '../../employees/dto/create-employee.dto';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;

  @Prop({ type: Number, default: null })
  latitude: number;

  @Prop({ type: Number, default: null })
  longitude: number;

  @Prop()
  employee: CreateEmployeeDto
}

export const UserSchema = SchemaFactory.createForClass(User);
