import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';
import { ProjectSchema } from './projects/schemas/project.schema';
import { ProjectsController } from './projects/projects.controller';
import { ProjectsService } from './projects/projects.service';
import { EmployeesModule } from './employees/employees.module';
import { EmployeeSchema } from './employees/schemas/employees.schema';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from './users/schemas/user.schema';
import { AttendanceModule } from './attendance/attendance.module';
import { AttendanceSchema } from './attendance/schemas/attendance.schema';
import { LeavesModule } from './leaves/leaves.module';
import { LeavesSchema } from './leaves/schemas/leaves.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    }),
    MongooseModule.forFeature([
      { name: 'Project', schema: ProjectSchema },
      {
        name: 'Employee',
        schema: EmployeeSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: 'Attendance',
        schema: AttendanceSchema,
      },
      {
        name: 'Leaves',
        schema: LeavesSchema,
      },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    ProjectsModule,
    EmployeesModule,
    AuthModule,
    AttendanceModule,
    LeavesModule,
  ],
  controllers: [AppController, ProjectsController],
  providers: [AppService, ProjectsService],
})
export class AppModule {}
