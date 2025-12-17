import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'entities/user.entity';
import { CreateUserDto } from '../../../dtos/createUser.dto';
import { searchField } from 'queryHelpers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findWithSearch(searchValue?: string): Promise<User[]> {
    let query = this.usersRepository.createQueryBuilder();
    query = searchField(query, 'name', searchValue);
    return searchField(query, 'email', searchValue).getMany();
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(userDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(this.usersRepository.create(userDto));
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
