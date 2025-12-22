import { Injectable } from '@nestjs/common';
import { StaffMember } from 'entities/staffMember.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { searchField } from 'queryHelpers';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(StaffMember)
    private staffRepository: Repository<StaffMember>,
  ) {}

  async findAll(): Promise<StaffMember[]> {
    return this.staffRepository.find();
  }

  async findWithSearch(searchValue?: string): Promise<StaffMember[]> {
    return searchField(
      this.staffRepository.createQueryBuilder(),
      'name',
      searchValue,
    ).getMany();
  }

  async findOne(id: number): Promise<StaffMember | null> {
    return this.staffRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.staffRepository.delete(id);
  }
}
