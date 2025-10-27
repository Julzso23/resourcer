import { Injectable } from '@nestjs/common';
import { StaffMember } from 'src/entities/staffMember.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(StaffMember)
    private staffRepository: Repository<StaffMember>,
  ) {}

  async findAll(): Promise<StaffMember[]> {
    return this.staffRepository.find();
  }

  async findOne(id: number): Promise<StaffMember | null> {
    return this.staffRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.staffRepository.delete(id);
  }
}
