import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { UpdateLocationDto } from './dto/location-dto';
import { EmailService } from 'src/common/email.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly emailService: EmailService,
  ) {}

  async create(createUserDto: CreateAuthDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();
    await this.emailService.sendMail(
      createdUser.email,
      `Welcome to HRES! Your account has been created`,
      this.getWelcomeEmailContent(createUserDto),
    );
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
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, { ...updateUserDto, updateUserDto }, { new: true })
      .exec();

    if (!updatedUser) {
      throw new Error('User not found or update failed');
    }

    await this.emailService.sendMail(
      updatedUser.email,
      `Your account information has been updated`,
      this.getUpdateAccountEmailContent(updateUserDto),
    );

    return updatedUser;

  }

  async remove(id: any): Promise<any> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async updateLocation(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateLocationDto, { new: true })
      .exec();

    if (!updatedUser) {
      throw new Error('User not found or update failed');
    }

    return updatedUser;
  }

  async updateStatus(id: string, status: boolean): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        id,
        { $set: { 'employee.status': status } },
        { new: true },
      )
      .exec();

    if (!updatedUser) {
      throw new Error('User not found or update failed');
    }

    return updatedUser;
  }

  async findCount(id: string): Promise<number> {
    return this.userModel.countDocuments({ _id: { $ne: id } }).exec();
  }

  private getWelcomeEmailContent(createUserDto: CreateAuthDto): string {
    return `
      Dear ${createUserDto.employee.name},
  
      Welcome to HRES! Your account has been created successfully. Below are your login credentials:
  
      - Email: ${createUserDto.email}
      - Password: ${createUserDto.password}
  
      Please keep this information safe and secure. You can now log in to your account through the HRES app to explore and make the most of our services.

      If you have any questions or need assistance, please feel free to contact HRES support at HR Department.
  
      Thank you!
  
      Best regards,  
      The HR Department
      Feather Codes PVT Ltd.
    `;
  }

  private getUpdateAccountEmailContent(updateUserDto: UpdateUserDto): string {
    return `
      Dear ${updateUserDto.employee.name},
  
      Your account information has been updated successfully. Below are your updated details:

      - Email: ${updateUserDto.email}
      - Password: ${updateUserDto.password}

      Please keep this information safe and secure. You can now log in to your account through the HRES app to explore and make the most of our services.

      If you have any questions or need assistance, please feel free to contact HRES support at HR Department.

      Thank you!
  
      Best regards,  
      The HR Department
      Feather Codes PVT Ltd.
    `;
  }
}
