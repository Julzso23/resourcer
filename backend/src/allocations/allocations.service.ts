import { Injectable } from '@nestjs/common';
import { Allocation } from 'entities/allocation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAllocationDto } from '../../../dtos/createAllocation.dto';
import { ProjectsService } from 'projects/projects.service';
import { StaffService } from 'staff/staff.service';
import { AllocationRemoval } from 'src/entities/allocationRemoval.entity';

@Injectable()
export class AllocationsService {
  constructor(
    @InjectRepository(Allocation)
    private allocationsRepository: Repository<Allocation>,
    @InjectRepository(AllocationRemoval)
    private allocationRemovalsRepository: Repository<AllocationRemoval>,
    private projectsService: ProjectsService,
    private staffService: StaffService,
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
      .leftJoinAndSelect('allocation.staffMember', 'staffMember')
      .leftJoinAndSelect('allocation.project', 'project')
      .leftJoin('allocation.createdIn', 'createdIn')
      .leftJoin('allocation.removals', 'removals')
      .leftJoin('removals.proposal', 'removalProposal')
      .where(`allocation.${projectView ? 'staffMember' : 'project'}Id = :id`, {
        id: projectOrStaffMemberId,
      })
      .andWhere(
        '(createdIn.submittedAt <= NOW() OR createdInId = :proposalId)',
        { proposalId },
      )
      .andWhere(
        '((removals.id IS NULL) OR (removalProposal.submittedAt IS NULL))'
      )
      .andWhere(
        '((removals.id IS NULL) OR (removalProposal.id != :proposalId))',
        { proposalId }
      )
      .getMany();
  }

  async findOne(id: number): Promise<Allocation | null> {
    return this.allocationsRepository.findOneBy({ id });
  }

  async create(allocationDto: CreateAllocationDto): Promise<Allocation> {
    const allocation = this.allocationsRepository.create({
      ...allocationDto,
      staffMember: { id: allocationDto.staffMemberId },
      project: { id: allocationDto.projectId },
      creator: { id: 1 },
      createdIn: { id: allocationDto.createdInId },
    });
    return this.allocationsRepository.save(allocation);
  }

  async edit(allocationId: number, allocationDto: CreateAllocationDto): Promise<Allocation> {
    await this.remove(allocationId, allocationDto.createdInId);
    return this.create(allocationDto);
  }

  async remove(id: number, proposalId: number): Promise<void> {
    await this.allocationRemovalsRepository.save(this.allocationRemovalsRepository.create({
      allocation: { id },
      proposal: { id: proposalId },
    }));
  }

  async getName(projectView: boolean, staffMemberId: number, projectId: number): Promise<string> {
    const collection = await ((projectView ? this.staffService : this.projectsService).findOne(projectView ? staffMemberId : projectId));
    return collection?.name || '';
  }
}
