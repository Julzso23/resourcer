import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  Req,
} from '@nestjs/common'
import { User } from 'entities/user.entity'
import { UsersService } from './users.service'
import { UserDto } from '../../../dtos/user.dto'
import { Request } from 'request'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async getMe(@Req() request: Request): Promise<UserDto> {
    const user: User | null = await this.usersService.findOne(request.user.id)
    if (user == null) throw new NotFoundException()
    return new UserDto(user.id, user.name, user.email)
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<UserDto> {
    const user: User | null = await this.usersService.findOne(id)
    if (user == null) throw new NotFoundException()
    return new UserDto(user.id, user.name, user.email)
  }

  @Get()
  async getAll(@Query('searchValue') searchValue?: string): Promise<UserDto[]> {
    return (await this.usersService.findWithSearch(searchValue)).map(
      (user) => new UserDto(user.id, user.name, user.email),
    )
  }
}
