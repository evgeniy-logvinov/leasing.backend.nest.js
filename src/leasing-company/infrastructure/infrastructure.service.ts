import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeasingCompany } from '../entity/leasing-company.entity';
import { Infrastructure } from './entity/infrustructure.entity';

@Injectable()
export class InfrastructureService {
  constructor(
    @InjectRepository(Infrastructure)
    private infrastructureRepository: Repository<Infrastructure>,
    @InjectRepository(LeasingCompany)
    private leasingCompanyRepository: Repository<LeasingCompany>,
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

  // TODO: check for user id and company
  async getByUserId(id: string): Promise<Infrastructure> {
    const company = await this.leasingCompanyRepository.findOneOrFail({
      where: { user: { id } },
      relations: { infrastructure: true },
    });

    if (!company?.infrastructure?.id) {
      throw new InternalServerErrorException('Infrastructure not exists');
    }

    return this.infrastructureRepository.findOne({
      relations: {
        analiticsDepartment: { analitics: true, head: true },
        salesDepartment: {
          cityManager: { head: true, manager: true },
          head: true,
        },
      },
      where: { id: company.infrastructure.id },
    });
  }
}
