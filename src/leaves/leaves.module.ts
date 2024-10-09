import { Module } from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { LeavesController } from './leaves.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Leaves, LeavesSchema } from './schemas/leaves.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Leaves.name, schema: LeavesSchema }]),
  ],
  controllers: [LeavesController],
  providers: [LeavesService],
})
export class LeavesModule {}
