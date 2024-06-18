import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: true })
  users: string[];

  @Prop({ required: true })
  created_at: Date;

  @Prop({ required: true })
  updated_at: Date;

  @Prop({ required: true })
  deleted_at: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
