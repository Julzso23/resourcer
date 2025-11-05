import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CreateAllocationDto } from '../../../dtos/createAllocation.dto';
import { AllocationDto } from '../../../dtos/allocation.dto';
import { AllocationsService } from './allocations.service';

@Controller('allocations')
export class AllocationsController {
  constructor(
    private allocationsService: AllocationsService,
  ) {}

  @Post()
  async create(@Body() allocationDto: CreateAllocationDto): Promise<AllocationDto> {
    const allocation = await this.allocationsService.create(allocationDto);
    return new AllocationDto(
      allocation.id,
      await this.allocationsService.getName(allocationDto.projectView, allocationDto.staffMemberId, allocationDto.projectId),
      allocation.percentage,
      allocation.start,
      allocation.end,
      allocationDto.staffMemberId,
      allocationDto.projectId,
    );
  }

  @Put(':id')
  async edit(@Param('id') id: number, @Body() allocationDto: CreateAllocationDto): Promise<AllocationDto> {
    const allocation = await this.allocationsService.edit(id, allocationDto);
    return new AllocationDto(
      allocation.id,
      await this.allocationsService.getName(allocationDto.projectView, allocationDto.staffMemberId, allocationDto.projectId),
      allocation.percentage,
      allocation.start,
      allocation.end,
      allocationDto.staffMemberId,
      allocationDto.projectId,
    );
  }
}
