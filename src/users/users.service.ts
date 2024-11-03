import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { Employee, EmployeeDocument } from 'src/employees/schemas/employees.schema';
import { UpdateLocationDto } from './dto/location-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async create(createUserDto: CreateAuthDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    const data = await this.userModel.find().exec();
    console.log(data);
    return data;
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User> {
    let res = await this.userModel.findOne({ email }).exec();
    return res;
  }

  async update(id: any, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, {...updateUserDto, updateUserDto}, { new: true }).exec();
  }

  async remove(id: any): Promise<any> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async updateLocation(id: string, updateLocationDto: UpdateLocationDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateLocationDto,
      { new: true }
    ).exec();

    if (!updatedUser) {
      throw new Error('User not found or update failed');
    }

    return updatedUser;
  }

  async updateStatus(id: string, status: boolean): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { $set: { 'employee.status': status } },
      { new: true }
    ).exec();

    if (!updatedUser) {
      throw new Error('User not found or update failed');
    }

    return updatedUser;
  }
}
