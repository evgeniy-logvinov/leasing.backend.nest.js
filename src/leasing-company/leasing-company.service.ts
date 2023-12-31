import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyProfile } from './company-profile/entity/company-profile.entity';
import { LeasingCompany } from './entity/leasing-company.entity';
import { CreateCompanyDto } from 'src/user/dto/create-company.dto';
import { User } from 'src/user/entity/user.entity';
import { RoleService } from 'src/user/role/role.service';
import { RoleEnum } from 'src/user/enum/RoleEnum';
import { Infrastructure } from './infrastructure/entity/infrustructure.entity';
import { PreferenceFilter } from './preference-filter/entity/preference-filter.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LeasingCompanyService {
  constructor(
    @InjectRepository(LeasingCompany)
    private leasingCompanyRepository: Repository<LeasingCompany>,
    @InjectRepository(CompanyProfile)
    private companyProfileRepository: Repository<CompanyProfile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Infrastructure)
    private infrastructureRepository: Repository<Infrastructure>,
    @InjectRepository(PreferenceFilter)
    private preferenceFilterRepository: Repository<PreferenceFilter>,
    private userService: UserService,
    private roleService: RoleService,
  ) {}

  getAll(): Promise<LeasingCompany[]> {
    return this.leasingCompanyRepository.find({
      select: { user: { email: true } },
      relations: {
        user: true,
        preferenceFilter: {
          cityOfPresenceCustomerCoverageArea: true,
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
            cityManager: { manager: true, head: true, city: true },
            head: true,
          },
        },
      },
    });
  }

  async createCompany(
    newCompany: CreateCompanyDto,
  ): Promise<{ message: string }> {
    const role = await this.roleService.getRole(RoleEnum.ROLE_LEASING_COMPANY);
    const { email, name, inn } = newCompany;
    console.log('email, name, inn', email, name, inn);
    try {
      const user = new User();
      user.email = email;
      user.role = role;
      await this.userRepository.save(user);

      const filter = new PreferenceFilter();
      await this.preferenceFilterRepository.save(filter);

      const profile = new CompanyProfile();
      profile.fullName = name;
      profile.inn = inn;
      await this.companyProfileRepository.save(profile);

      const infrastructure = new Infrastructure();
      await this.infrastructureRepository.save(infrastructure);

      const leasingCompany = new LeasingCompany();
      leasingCompany.companyProfile = profile;
      leasingCompany.user = user;
      leasingCompany.infrastructure = infrastructure;
      leasingCompany.preferenceFilter = filter;
      await this.leasingCompanyRepository.save(leasingCompany);

      return { message: 'User successfully created !' };
    } catch (error) {
      // postgresql
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      // For mysql
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      }
      console.log('err', error);
      throw new InternalServerErrorException();
    }
  }

  async setDescription(
    id: string,
    description: string,
  ): Promise<{ message: string }> {
    try {
      this.leasingCompanyRepository.update(id, { description });
      return { message: 'Description saved' };
    } catch (err) {
      throw new InternalServerErrorException(`Can't set description`);
    }
  }

  async invite(id: string): Promise<CompanyProfile> {
    try {
      const company = await this.leasingCompanyRepository.findOne({
        relations: { user: true },
        where: { companyProfile: { id } },
      });

      await this.userService.invite(company.user.id);

      return company.companyProfile;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(`Can't invite user`);
    }
  }

  async block(id: string): Promise<CompanyProfile> {
    try {
      const company = await this.leasingCompanyRepository.findOne({
        relations: { user: true },
        where: { companyProfile: { id } },
      });

      await this.userService.block(company.user.id);

      return company.companyProfile;
    } catch (err) {
      throw new InternalServerErrorException(`Can't block user`);
    }
  }

  async unblock(id: string): Promise<CompanyProfile> {
    try {
      const company = await this.leasingCompanyRepository.findOne({
        relations: { user: true },
        where: { companyProfile: { id } },
      });

      await this.userService.unblock(company.user.id);

      return company.companyProfile;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(`Can't unblock user`);
    }
  }

  async accreditation(
    id: string,
    accreditation: boolean,
  ): Promise<CompanyProfile> {
    try {
      await this.companyProfileRepository.update(id, {
        accreditation,
      });

      return this.companyProfileRepository.findOne({ where: { id } });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(`Can't unblock user`);
    }
  }
}
