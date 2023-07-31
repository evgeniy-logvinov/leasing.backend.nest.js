import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entity/application.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  getAll(): Promise<Application[]> {
    return this.applicationRepository.find({
      relations: {
        commercialProposal: true,
      },
    });
  }

  getAllByUserId(id: string): Promise<Application[]> {
    return this.applicationRepository.find({
      where: { client: { user: { id } } },
      relations: {
        commercialProposal: true,
      },
    });
  }
}
