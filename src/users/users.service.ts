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
  ) {}

  async create(createUserDto: CreateAuthDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User> {
    let res = await this.userModel.findOne({email}).exec();
    return res;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async remove(id: number): Promise<any> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async updateLocation(id: string, updateLocationDto: UpdateLocationDto): Promise<User> {
    const { latitude, longitude } = updateLocationDto;
    console.log('updateLocationDto', updateLocationDto);
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id, 
      updateLocationDto,
      { new: true } // Returns the updated document
    ).exec();
    
    if (!updatedUser) {
      throw new Error('User not found or update failed');
    }

    return updatedUser;
  }
}
