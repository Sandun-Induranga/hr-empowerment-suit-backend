export class Project {
  id: number;
  name: string;
  description: string;
  users: string[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  constructor(id: number, name: string, description: string, created_at: Date, updated_at: Date, deleted_at: Date) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
