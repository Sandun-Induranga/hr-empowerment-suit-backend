export interface IProject {
  _id: string;
  name: string;
  description: string;
  users: string[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
