import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Infrastructure } from './entity/infrustructure.entity';

@Injectable()
export class InfrastructureService {
  constructor(
    @InjectRepository(Infrastructure)
    private infrastructureRepository: Repository<Infrastructure>,
  ) {}

  getAll(): Promise<Infrastructure[]> {
    return this.infrastructureRepository.find({
      relations: {
        analiticsDepartment: { analitics: true, head: true },
        salesDepartment: {
          cityManager: { manager: true, head: true },
          head: true,
        },
      },
    });
  }
}
