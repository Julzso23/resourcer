import { Injectable } from '@nestjs/common';
import { Allocation } from 'entities/allocation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAllocationDto } from '../../../dtos/createAllocation.dto';

@Injectable()
export class AllocationsService {
  constructor(
    @InjectRepository(Allocation)
    private allocationssRepository: Repository<Allocation>,
  ) {}

  async findAll(): Promise<Allocation[]> {
    return this.allocationssRepository.find();
  }

  async findOne(id: number): Promise<Allocation | null> {
    return this.allocationssRepository.findOneBy({ id });
  }

  async create(allocationDto: CreateAllocationDto): Promise<Allocation> {
    return this.allocationssRepository.save(
      this.allocationssRepository.create(allocationDto),
    );
  }

  async remove(id: number): Promise<void> {
    await this.allocationssRepository.delete(id);
  }
}
