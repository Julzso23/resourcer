import { Injectable } from '@nestjs/common';
import { Project } from 'entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private usersRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<Project | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
