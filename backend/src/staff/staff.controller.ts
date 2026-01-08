import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffMemberDto } from '../../../dtos/staffMember.dto';
import { StaffMember } from 'entities/staffMember.entity';

@Controller('staff')
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Get(':id')
  async get(@Param('id') id: number): Promise<StaffMemberDto> {
    const staffMember: StaffMember | null = await this.staffService.findOne(id);
    if (staffMember == null) throw new NotFoundException();
    return new StaffMemberDto(staffMember.id, staffMember.name);
  }

  @Get()
  async getAll(
    @Query('searchValue') searchValue?: string,
  ): Promise<StaffMemberDto[]> {
    return (await this.staffService.findWithSearch(searchValue)).map(
      (staffMember) => new StaffMemberDto(staffMember.id, staffMember.name),
    );
  }
}
