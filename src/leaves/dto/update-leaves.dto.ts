import { PartialType } from '@nestjs/swagger';
import { CreateLeaveDto } from './create-leaves.dto';

export class UpdateLeavesDto extends PartialType(CreateLeaveDto) {}
