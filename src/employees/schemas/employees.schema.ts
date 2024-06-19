import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop({ required: true })
  employeeId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  birthday: Date;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  salary: number;

  @Prop({ required: true })
  gender: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
