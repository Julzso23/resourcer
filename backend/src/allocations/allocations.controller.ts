import { Controller, Post, Put } from '@nestjs/common';
import { CreateAllocationDto } from '../../../dtos/createAllocation.dto';
import { AllocationDto } from '../../../dtos/allocation.dto';
import { AllocationsService } from './allocations.service';

@Controller('allocations')
export class AllocationsController {
  constructor(
    private allocationsService: AllocationsService,
  ) {}

  @Post()
  async create(allocationDto: CreateAllocationDto): Promise<AllocationDto> {
    const allocation = await this.allocationsService.create(allocationDto);
    return new AllocationDto(
      allocation.id,
      await this.allocationsService.getName(allocationDto.projectView, allocationDto.staffId, allocationDto.projectId),
      allocation.percentage,
      allocation.start,
      allocation.end
    );
  }

  @Put(':id')
  async edit(id: number, allocationDto: CreateAllocationDto): Promise<AllocationDto> {
    const allocation = await this.allocationsService.edit(id, allocationDto);
    return new AllocationDto(
      allocation.id,
      await this.allocationsService.getName(allocationDto.projectView, allocationDto.staffId, allocationDto.projectId),
      allocation.percentage,
      allocation.start,
      allocation.end
    );
  }
}
