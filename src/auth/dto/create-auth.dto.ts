import { CreateEmployeeDto } from '../../employees/dto/create-employee.dto';

export class CreateAuthDto {
  email: string;
  password: string;
  role: string;
  employee: CreateEmployeeDto;
}
