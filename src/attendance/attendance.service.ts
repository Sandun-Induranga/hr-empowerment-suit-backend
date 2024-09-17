import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance, AttendanceDocument } from './schemas/attendance.schema';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name) private attendanceModel: Model<AttendanceDocument>,
  ) {}
  create(createAttendanceDto: CreateAttendanceDto) {
    const newProject = new this.attendanceModel(createAttendanceDto);
    return newProject.save();
  }

  findAll() {
    return this.attendanceModel.find().exec();
  }

  findOne(id: number) {
    return this.attendanceModel.findById(id).exec();
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceModel.findByIdAndUpdate(id, updateAttendanceDto, { new: true }).exec();
  }

  remove(id: number) {
    return this.attendanceModel.findById(id).exec();
  }
}
