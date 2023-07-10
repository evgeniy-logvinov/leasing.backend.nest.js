import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeasingCompany } from './entity/leasing-company.entity';

@Injectable()
export class LeasingCompanyService {
  constructor(
    @InjectRepository(LeasingCompany)
    private leasingCompanyRepository: Repository<LeasingCompany>,
  ) {}

  getAll(): Promise<LeasingCompany[]> {
    return this.leasingCompanyRepository.find({
      relations: {
        preferenceFilter: {
          cityOfPresenceCustomerCoverageArea: {
            cities: true,
          },
          gk: {
            subCompanies: true,
          },
          typesOfFinancedHoldings: {
            newCriteria: { ip: true, legal: true },
            previouslyUsedCriteria: { ip: true, legal: true },
            returnableCriteria: { ip: true, legal: true },
          },
          subjectGuarantee: true,
        },
        companyProfile: true,
        infrastructure: {
          analiticsDepartment: { analitics: true, head: true },
          salesDepartment: {
            cityManager: { manager: true, head: true },
            head: true,
          },
        },
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
