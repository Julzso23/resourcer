import { Injectable } from '@nestjs/common';
import { Allocation } from 'entities/allocation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAllocationDto } from '../../../dtos/createAllocation.dto';

@Injectable()
export class AllocationsService {
  constructor(
    @InjectRepository(Allocation)
    private allocationsRepository: Repository<Allocation>,
  ) {}

  async findAll(): Promise<Allocation[]> {
    return this.allocationsRepository.find();
  }

  async findAllActive(
    projectView: boolean,
    projectOrStaffMemberId: number,
    proposalId?: number,
  ): Promise<Allocation[]> {
    return this.allocationsRepository
      .createQueryBuilder('allocation')
      .leftJoinAndSelect(
        `allocation.${projectView ? 'staffMember' : 'project'}`,
        projectView ? 'staffMember' : 'project',
      )
      .leftJoin('allocation.createdIn', 'createdIn')
      .where(`allocation.${projectView ? 'staffMember' : 'project'}Id = :id`, {
        id: projectOrStaffMemberId,
      })
      .andWhere(
        '(createdIn.submittedAt <= NOW() OR createdInId = :proposalId)',
        { proposalId },
      )
      .getMany();
  }

  async findOne(id: number): Promise<Allocation | null> {
    return this.allocationsRepository.findOneBy({ id });
  }

  async create(allocationDto: CreateAllocationDto): Promise<Allocation> {
    return this.allocationsRepository.save(
      this.allocationsRepository.create(allocationDto),
    );
  }

  async remove(id: number): Promise<void> {
    await this.allocationsRepository.delete(id);
  }
}
