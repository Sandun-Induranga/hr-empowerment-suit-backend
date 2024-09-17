import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAttendanceDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  status: string;
}
