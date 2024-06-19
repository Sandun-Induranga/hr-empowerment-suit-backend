import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmployeeDocument } from './schemas/employees.schema';

@Injectable()
export class EmployeesService {

  constructor(
    @InjectModel('Employee') private employeeModel: Model<EmployeeDocument>,
  ) {
  }
  create(createEmployeeDto: CreateEmployeeDto) {
    return 'This action adds a new employee';
  }

  findAll() {
    return `This action returns all employees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
