// src/leaves/dto/create-leave.dto.ts
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateLeaveDto {
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsEnum(['Pending', 'Approved', 'Rejected'])
  status: string;
}
