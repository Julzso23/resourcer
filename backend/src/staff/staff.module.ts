import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffMember } from 'src/entities/staffMember.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaffMember])],
  providers: [StaffService],
  controllers: [StaffController],
})
export class StaffModule {}
