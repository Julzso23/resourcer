import { Injectable, NotFoundException } from '@nestjs/common';
import { Allocation } from 'entities/allocation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAllocationDto } from '../../../dtos/createAllocation.dto';
import { Proposal } from 'entities/proposal.entity';
import { ProjectsService } from 'projects/projects.service';
import { StaffService } from 'staff/staff.service';

@Injectable()
export class AllocationsService {
  constructor(
    @InjectRepository(Allocation)
    private allocationsRepository: Repository<Allocation>,
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

  async edit(allocationId: number, allocationDto: CreateAllocationDto): Promise<Allocation> {
    const oldAllocation = await this.findOne(allocationId);
    if (oldAllocation != null) {
      const proposal = new Proposal();
      proposal.id = allocationDto.createdInId;
      oldAllocation?.deletedIn.push(proposal);
      this.allocationsRepository.save(oldAllocation);
    } else {
      throw new NotFoundException();
    }
    return this.allocationsRepository.save(
      this.allocationsRepository.create(allocationDto),
    );
  }

  async remove(id: number): Promise<void> {
    await this.allocationsRepository.delete(id);
  }

  async getName(projectView: boolean, staffMemberId: number, projectId: number): Promise<string> {
    const collection = projectView ? await (projectView ? this.staffService : this.projectsService).findOne(projectView ? staffMemberId : projectId) : undefined;
    return collection?.name || '';
  }
}
