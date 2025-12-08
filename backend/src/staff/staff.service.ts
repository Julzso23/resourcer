import { Injectable } from '@nestjs/common';
import { StaffMember } from 'src/entities/staffMember.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(StaffMember)
    private staffRepository: Repository<StaffMember>,
  ) {}

  async findAll(): Promise<StaffMember[]> {
    return this.staffRepository.find();
  }

  async findWithSearch(searchValue?: string): Promise<StaffMember[]> {
    const searchTerms: string[] | undefined = searchValue?.trim().split(/\s/);
    let builder = this.staffRepository.createQueryBuilder();
    for (const i in searchTerms) {
      if (i == '0') {
        builder = builder.where({
          name: Like(`%${searchTerms[i]}%`)
        })
      } else {
        builder = builder.orWhere({
          name: Like(`%${searchTerms[i]}%`)
        })
      }
    }
    return builder.getMany();
  }

  async findOne(id: number): Promise<StaffMember | null> {
    return this.staffRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.staffRepository.delete(id);
  }
}
