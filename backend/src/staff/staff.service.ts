import { Injectable } from '@nestjs/common';
import { Staff } from 'entities/staff.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff) private usersRepository: Repository<Staff>,
  ) {}

  async findAll(): Promise<Staff[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<Staff | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
