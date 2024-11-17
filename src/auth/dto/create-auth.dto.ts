import { IsNotEmpty } from 'class-validator';
import { CreateEmployeeDto } from '../../employees/dto/create-employee.dto';

export class CreateAuthDto {
  @IsNotEmpty()
  email: string;

  password: string;
  
  role: string;

  employee: CreateEmployeeDto;
}
