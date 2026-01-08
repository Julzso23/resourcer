import { ForbiddenException, Injectable } from '@nestjs/common'
import { User } from 'entities/user.entity'
import * as argon2 from 'argon2/argon2.cjs'
import { CreateUserDto } from '../../../dtos/createUser.dto'
import { UsersService } from 'users/users.service'
import { LoginDto } from '../../../dtos/login.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<string> {
    userDto.password = await argon2.hash(userDto.password)
    const user: User = await this.usersService.create(userDto)
    return this.createToken(user.id)
  }

  async login(user: User): Promise<string> {
    return this.createToken(user.id)
  }

  async validateLoginDetails(details: LoginDto): Promise<User | null> {
    const user: User | null = await this.usersService.findByEmail(details.email)
    if (user == null) throw new ForbiddenException()
    if (!(await argon2.verify(user.password, details.password))) return null
    return user
  }

  async createToken(userId: number): Promise<string> {
    return this.jwtService.signAsync({ userId })
  }
}
