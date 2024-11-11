import { Injectable } from '@nestjs/common';
import { UpdateLeavesDto } from './dto/update-leaves.dto';
import { CreateLeaveDto } from './dto/create-leaves.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Leaves, LeavesDocument } from './schemas/leaves.schema';
import { EmailService } from 'src/common/email.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LeavesService {
  constructor(
    @InjectModel(Leaves.name) private leavesModel: Model<LeavesDocument>,
    private readonly emailService: EmailService,
    private readonly userService: UsersService,
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
    const leave = await this.leavesModel
      .findByIdAndUpdate(id, updateLeafDto, { new: true })
      .exec();
    
    if (!leave) {
      throw new Error('Leave not found or update failed');
    }

    const user = await this.userService.findOne(leave.user_id);

    if (updateLeafDto.status.toLocaleLowerCase() === 'rejected') {
  
      await this.emailService.sendMail(
        user.email,
        `Your leave request has been rejected`,
        this.getRejectedEmailContent(leave),
      );
    }else if (updateLeafDto.status.toLocaleLowerCase() === 'approved') {
      await this.emailService.sendMail(
        user.email,
        `Your leave request has been approved`,
        this.getApprovedEmailContent(leave),
      );
    }
  }

  private getRejectedEmailContent(leave: Leaves) {
    return `Your leave request has been rejected.
    Start Date: ${leave.date}
    No of Days: ${leave.day_count}
    Reason: ${leave.reason}

    Please contact your us for more information.

    Best Regards,
    HRES Team
    `;
  }

  private getApprovedEmailContent(leave: Leaves) {
    return `Your leave request has been approved.
    Start Date: ${leave.date}
    No of Days: ${leave.day_count}
    Reason: ${leave.reason}

    Please contact your us for more information.

    Best Regards,
    HRES Team
    `;
  }

  async remove(id: string) {
    return this.leavesModel.findByIdAndDelete(id).exec();
  }
}
