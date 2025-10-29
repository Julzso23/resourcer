import { Module } from '@nestjs/common';
import { AllocationsService } from './allocations.service';
import { AllocationsController } from './allocations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allocation } from 'entities/allocation.entity';
import { ProjectsModule } from 'src/projects/projects.module';
import { StaffModule } from 'src/staff/staff.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Allocation]),
    ProjectsModule,
    StaffModule,
  ],
  providers: [AllocationsService],
  controllers: [AllocationsController],
  exports: [AllocationsService],
})
export class AllocationsModule {}
