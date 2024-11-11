import { forwardRef, Module } from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { LeavesController } from './leaves.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Leaves, LeavesSchema } from './schemas/leaves.schema';
import { EmailService } from 'src/common/email.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([{ name: Leaves.name, schema: LeavesSchema }, { name: User.name, schema: UserSchema }],),
  ],
  controllers: [LeavesController],
  providers: [LeavesService, EmailService, UsersService],
})
export class LeavesModule {}
