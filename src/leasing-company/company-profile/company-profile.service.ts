import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeasingCompany } from '../entity/leasing-company.entity';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';
import { CompanyProfile } from './entity/company-profile.entity';

@Injectable()
export class CompanyProfileService {
  constructor(
    @InjectRepository(CompanyProfile)
    private companyInfoRepository: Repository<CompanyProfile>,
    @InjectRepository(LeasingCompany)
    private leasingCompanyRepository: Repository<LeasingCompany>,
  ) {}

  getAll(): Promise<CompanyProfile[]> {
    return this.companyInfoRepository.find({});
  }

  // TODO: check for user id and company
  async getByUserId(id: string): Promise<CompanyProfile> {
    const company = await this.leasingCompanyRepository.findOneOrFail({
      where: { user: { id } },
      relations: { companyProfile: true },
    });

    if (!company?.companyProfile?.id) {
      throw new InternalServerErrorException('Profile not exists');
    }

    return this.companyInfoRepository.findOne({
      where: { id: company.companyProfile.id },
    });
  }

  async updateProfile(
    userId: string,
    newProfile: UpdateCompanyProfileDto,
  ): Promise<{ message: string }> {
    const client = await this.leasingCompanyRepository.findOneOrFail({
      where: { user: { id: userId } },
      relations: { companyProfile: true },
    });

    if (!client) {
      throw new InternalServerErrorException('Company not found');
    }

    const { fullName, inn, shortName, state, id } = newProfile;

    try {
      await this.companyInfoRepository.update(id, {
        fullName,
        inn,
        shortName,
        state,
      });

      return { message: 'Profile successfully updated!' };
    } catch (error) {
      // postgresql
      if (error.code === '23505') {
        throw new ConflictException('Profile already exists');
      }
      // For mysql
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Profile already exists');
      }
      console.log('err', error);
      throw new InternalServerErrorException();
    }
  }
}
