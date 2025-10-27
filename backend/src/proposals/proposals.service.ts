import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proposal } from 'entities/proposal.entity';
import { ProposalAllocationsDto } from '../../../dtos/proposalAllocations.dto';
import { Project } from 'entities/project.entity';
import { Allocation } from 'entities/allocation.entity';
import { AllocationCollectionDto } from '../../../dtos/allocationCollection.dto';
import { StaffMember } from 'src/entities/staffMember.entity';
import { AllocationDto } from '../../../dtos/allocation.dto';

@Injectable()
export class ProposalsService {
  constructor(
    @InjectRepository(Proposal)
    private proposalsRepository: Repository<Proposal>,
    @InjectRepository(Project) private projectsRepository: Repository<Project>,
    @InjectRepository(StaffMember)
    private staffRepository: Repository<StaffMember>,
    @InjectRepository(Allocation)
    private allocationsRepository: Repository<Allocation>,
  ) {}

  async findAll(): Promise<Proposal[]> {
    return this.proposalsRepository.find();
  }

  async findOne(id: number): Promise<Proposal | null> {
    return this.proposalsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.proposalsRepository.delete(id);
  }

  async getMaster(projectView: boolean, withProposal?: number): Promise<ProposalAllocationsDto> {
    const projects: Project[] = projectView ? await this.projectsRepository.find() : [];
    const staff: StaffMember[] = !projectView ? await this.staffRepository.find() : [];
    return new ProposalAllocationsDto(
      await Promise.all(
        (projectView ? projects : staff).map(
          async (projectOrStaffMember) =>
            new AllocationCollectionDto(
              projectOrStaffMember.id,
              projectOrStaffMember.name,
              (
                await this.allocationsRepository
                  .createQueryBuilder('allocation')
                  .leftJoinAndSelect(`allocation.${projectView ? 'staffMember' : 'project'}`, projectView ? 'staffMember' : 'project')
                  .leftJoin('allocation.createdIn', 'createdIn')
                  .where(`allocation.${projectView ? 'staffMember' : 'project'}Id = :id`, { id: projectOrStaffMember.id })
                  .andWhere('(createdIn.submittedAt <= NOW() OR createdInId = :proposalId)', { proposalId: withProposal })
                  .getMany()
              ).map(
                (allocation) =>
                  new AllocationDto(
                    allocation.id,
                    (projectView ? allocation.staffMember : allocation.project)?.name || '',
                    allocation.percentage,
                    allocation.start,
                    allocation.end,
                  ),
              ),
            ),
        ),
      ),
    );
  }
}
