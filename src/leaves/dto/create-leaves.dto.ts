// src/leaves/dto/create-leave.dto.ts
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateLeaveDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  date: Date;

  @IsString()
  reason: string;

  @IsNotEmpty()
  day_count: Date;

  @IsEnum(['Pending', 'Approved', 'Rejected'])
  status: string;
}
