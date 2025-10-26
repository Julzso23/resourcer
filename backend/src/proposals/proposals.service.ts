import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proposal } from 'entities/proposal.entity';

@Injectable()
export class ProposalsService {
  constructor(
    @InjectRepository(Proposal) private usersRepository: Repository<Proposal>,
  ) {}

  async findAll(): Promise<Proposal[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<Proposal | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
