import { Injectable } from '@nestjs/common';
import { Project } from 'entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectsRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async findOne(id: number): Promise<Project | null> {
    return this.projectsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}
