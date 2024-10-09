import { Injectable } from '@nestjs/common';
import { UpdateLeavesDto } from './dto/update-leaves.dto';
import { CreateLeaveDto } from './dto/create-leaves.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Leaves, LeavesDocument } from './schemas/leaves.schema';

@Injectable()
export class LeavesService {
  constructor(
    @InjectModel(Leaves.name) private leavesModel: Model<LeavesDocument>,
  ) {}

  async create(createLeaveDto: CreateLeaveDto) {
    const newLeave = new this.leavesModel(createLeaveDto);
    return newLeave.save();
  }

  async findAll() {
    return this.leavesModel.find().exec();
  }

  async findOne(id: string) {
    return this.leavesModel.findById(id).exec();
  }

  async update(id: string, updateLeafDto: UpdateLeavesDto) {
    return this.leavesModel
      .findByIdAndUpdate(id, updateLeafDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.leavesModel.findByIdAndDelete(id).exec();
  }
}
