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
import { AuthModule } from './auth/auth.module';

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
    ]),
    UsersModule,
    ProjectsModule,
    EmployeesModule,
    AuthModule,
  ],
  controllers: [AppController, ProjectsController],
  providers: [AppService, ProjectsService],
})
export class AppModule {}
