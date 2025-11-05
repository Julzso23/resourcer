import { Module } from '@nestjs/common';
import { AllocationsService } from './allocations.service';
import { AllocationsController } from './allocations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allocation } from 'entities/allocation.entity';
import { ProjectsModule } from 'projects/projects.module';
import { StaffModule } from 'staff/staff.module';
import { AllocationRemoval } from 'entities/allocationRemoval.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Allocation, AllocationRemoval]),
    ProjectsModule,
    StaffModule,
  ],
  providers: [AllocationsService],
  controllers: [AllocationsController],
  exports: [AllocationsService],
})
export class AllocationsModule {}
