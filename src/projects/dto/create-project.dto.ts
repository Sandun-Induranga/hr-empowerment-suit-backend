import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  description: string;

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  users: string[];

  @IsNotEmpty()
  created_at: Date;
}
