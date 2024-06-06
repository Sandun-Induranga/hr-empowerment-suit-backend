import { Document } from 'mongoose';

export interface IProject extends Document {
  readonly _id: string;
  readonly name: string;
  readonly description: string;
  readonly users: string[];
  readonly created_at: Date;
  readonly updated_at: Date;
  readonly deleted_at: Date;
}
