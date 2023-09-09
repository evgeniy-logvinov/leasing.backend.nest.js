import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeasingCompany } from '../entity/leasing-company.entity';
import { PreferenceFilter } from './entity/preference-filter.entity';

@Injectable()
export class PreferenceFilterService {
  constructor(
    @InjectRepository(PreferenceFilter)
    private preferenceFilterRepository: Repository<PreferenceFilter>,
    @InjectRepository(LeasingCompany)
    private leasingCompanyRepository: Repository<LeasingCompany>,
  ) {}

  getAll(): Promise<PreferenceFilter[]> {
    return this.preferenceFilterRepository.find({
      relations: {
        cityOfPresenceCustomerCoverageArea: {
          city: true,
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
    });
  }

  async getByUserId(id: string) {
    const company = await this.leasingCompanyRepository.findOneOrFail({
      where: { user: { id } },
      relations: { preferenceFilter: true },
    });

    if (!company?.preferenceFilter?.id) {
      throw new InternalServerErrorException('Company profile not exists');
    }

    return this.preferenceFilterRepository.findOne({
      relations: {
        gk: { subCompanies: true },
        cityOfPresenceCustomerCoverageArea: {
          city: true,
          сustomerCoverageAreas: true,
        },
        subjectGuarantee: true,
      },
      where: { id: company.preferenceFilter.id },
    });
  }
}
