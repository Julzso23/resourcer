import { Module } from '@nestjs/common';
import { AllocationsService } from './allocations.service';
import { AllocationsController } from './allocations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allocation } from 'entities/allocation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Allocation])],
  providers: [AllocationsService],
  controllers: [AllocationsController],
})
export class AllocationsModule {}
