import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PreferenceFilter } from './entity/preference-filter.entity';

@Injectable()
export class PreferenceFilterService {
  constructor(
    @InjectRepository(PreferenceFilter)
    private preferenceFilterRepository: Repository<PreferenceFilter>,
  ) {}

  getAll(): Promise<PreferenceFilter[]> {
    return this.preferenceFilterRepository.find({
      relations: {
        cityOfPresenceCustomerCoverageArea: {
          cities: true,
        },
        gk: {
          subCompanies: true,
        },
        typesOfFinancedHoldings: {
          newCriteria: true,
          previouslyUsedCriteria: true,
          returnableCriteria: true,
        },
        subjectGuarantee: true,
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
