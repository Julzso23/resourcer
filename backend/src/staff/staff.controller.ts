import { Controller, Get } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffMemberDto } from '../../../dtos/staffMember.dto';

@Controller('staff')
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Get()
  async getAll(): Promise<StaffMemberDto[]> {
    return (await this.staffService.findAll()).map(staffMember => new StaffMemberDto(staffMember.id, staffMember.name));
  }
}
