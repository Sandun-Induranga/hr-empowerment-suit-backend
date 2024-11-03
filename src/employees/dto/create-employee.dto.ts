import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  picture: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  birthday: Date;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  mobile: string;

  @IsNotEmpty()
  position: string;

  @IsNotEmpty()
  department: string;

  @IsNotEmpty()
  @IsNumber()
  salary: number;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  joinDate: Date;

  status: string;
}
