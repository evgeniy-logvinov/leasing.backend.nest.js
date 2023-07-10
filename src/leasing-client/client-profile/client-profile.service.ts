import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProfile } from './entity/client-profile.entity';

@Injectable()
export class ClientProfileService {
  constructor(
    @InjectRepository(ClientProfile)
    private clientProfileRepository: Repository<ClientProfile>,
  ) {}

  getAll(): Promise<ClientProfile[]> {
    return this.clientProfileRepository.find({
      // relations: {
      //   analiticsDepartment: { analitics: true, head: true },
      //   salesDepartment: {
      //     cityManager: { manager: true, head: true },
      //     head: true,
      //   },
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
      // },
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
