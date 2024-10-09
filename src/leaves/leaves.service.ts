import { Injectable } from '@nestjs/common';
import { UpdateLeavesDto } from './dto/update-leaves.dto';
import { CreateLeaveDto } from './dto/create-leaves.dto';

@Injectable()
export class LeavesService {
  create(createLeafDto: CreateLeaveDto) {
    return 'This action adds a new leaf';
  }

  findAll() {
    return `This action returns all leaves`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leaf`;
  }

  update(id: number, updateLeafDto: UpdateLeavesDto) {
    return `This action updates a #${id} leaf`;
  }

  remove(id: number) {
    return `This action removes a #${id} leaf`;
  }
}
