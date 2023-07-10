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
        //   cityOfPresenceCustomerCoverageArea: {
        //     cities: true,
        //   },
        //   gk: {
        //     subCompanies: true,
        //   },
        //   typesOfFinancedHoldings: {
        //     newCriteria: { ip: true, legal: true },
        //     previouslyUsedCriteria: { ip: true, legal: true },
        //     returnableCriteria: { ip: true, legal: true },
        //   },
        //   subjectGuarantee: true,
      },
      // return await this.postRepository.find({
      //   relations: ['images', 'user'],
      //   where: { user: { id: id } },
      // });,
    });
  }

  // getAll(): Promise<PreferenceFilter[]> {
  //   return this.preferenceFilterRepository.create({
  //     cityOfPresenceCustomerCoverageArea: {
  //       cities: {

  //       }
  //     }
  //   });
  // }
}
