import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProject } from './interface/IProject';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel('Projects') private projectModel: Model<IProject>) {}

  async create(createProjectDto: CreateProjectDto): Promise<IProject> {
    const newProject = new this.projectModel(createProjectDto);
    return newProject.save();
  }

  async findAll(): Promise<IProject[]> {
    return this.projectModel.find().exec();
  }

  async findOne(id: string): Promise<IProject> {
    return this.projectModel.findById(id).exec();
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<IProject> {
    return this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<IProject> {
    return this.projectModel.findByIdAndDelete(id).exec();
  }
}
