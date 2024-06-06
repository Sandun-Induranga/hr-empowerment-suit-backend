import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Project {
  @Prop()
  _id: string;
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  users: string[];
  @Prop()
  created_at: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
