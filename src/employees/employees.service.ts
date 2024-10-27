import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './schemas/employees.schema';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const newEmployee = new this.employeeModel(createEmployeeDto);
    return newEmployee.save();
  }

  findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  findOne(id: string) {
    return this.employeeModel.findOne({ employeeId: id }).exec();
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeModel.findOneAndUpdate({ employeeId: id }).exec();
  }

  remove(id: number) {
    return this.employeeModel.findOneAndDelete({ employeeId: id }).exec();
  }
}
