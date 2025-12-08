import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { User } from 'entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async get(@Param('id') id: number): Promise<User> {
    const user: User | null = await this.usersService.findOne(id);
    if (user == null) throw new NotFoundException();
    return user;
  }
}
