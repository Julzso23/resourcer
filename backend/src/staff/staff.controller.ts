import { Controller, Get, Query } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffMemberDto } from '../../../dtos/staffMember.dto';

@Controller('staff')
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Get()
  async getAll(@Query('searchValue') searchValue?: string): Promise<StaffMemberDto[]> {
    console.log(searchValue)
    return (await this.staffService.findWithSearch(searchValue)).map(staffMember => new StaffMemberDto(staffMember.id, staffMember.name));
  }
}
