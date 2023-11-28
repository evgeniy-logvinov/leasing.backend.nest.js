import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';
import { LeasingCompany } from '../entity/leasing-company.entity';
import { Employee } from './entity/employee.entity';
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
          cityManager: { manager: true, head: true, city: true },
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
    const employee: FindOptionsSelect<Employee> = {
      id: true,
      user: { email: true },
      patronymic: true,
      firstName: true,
      lastName: true,
      isOnline: true,
      mobilePhone: true,
      phone: true,
    };
    return this.infrastructureRepository.findOne({
      select: {
        analiticsDepartment: {
          id: true,
          head: employee,
          analitics: employee,
        },
        salesDepartment: {
          id: true,
          head: employee,
          cityManager: {
            id: true,
            head: employee,
            manager: employee,
          },
        },
      },
      relations: {
        analiticsDepartment: {
          analitics: { user: true },
          head: { user: true },
        },
        salesDepartment: {
          cityManager: {
            head: { user: true },
            manager: { user: true },
            city: true,
          },
          head: { user: true },
        },
      },
      where: { id: company.infrastructure.id },
    });
  }
}
