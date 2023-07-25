import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyStateEnum } from 'src/user/enum/CompanyStateEnum';
import { Repository } from 'typeorm';
import { CompanyProfile } from './company-profile/entity/company-profile.entity';
import { LeasingCompany } from './entity/leasing-company.entity';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from 'src/email/services/email.service';
import { CreateCompanyDto } from 'src/user/dto/create-company.dto';
import { User } from 'src/user/entity/user.entity';
import { RoleService } from 'src/user/role/role.service';
import { RoleEnum } from 'src/user/enum/RoleEnum';
import { Infrastructure } from './infrastructure/entity/infrustructure.entity';
import { PreferenceFilter } from './preference-filter/entity/preference-filter.entity';

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
    private emailService: EmailService,
    private roleService: RoleService,
  ) {}

  getAll(): Promise<LeasingCompany[]> {
    return this.leasingCompanyRepository.find({
      select: { user: { email: true } },
      relations: {
        user: true,
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
    id: number,
    description: string,
  ): Promise<{ message: string }> {
    try {
      this.leasingCompanyRepository.update(id, { description });
      return { message: 'Description saved' };
    } catch (err) {
      throw new InternalServerErrorException(`Can't set description`);
    }
  }

  async invite(id: number): Promise<CompanyProfile> {
    try {
      const profile = await this.companyProfileRepository.findOne({
        where: { id },
      });

      if (profile.state !== CompanyStateEnum.UNREG) {
        throw new InternalServerErrorException(
          'User can be invite only when unregistred',
        );
      }

      const client = await this.leasingCompanyRepository.findOne({
        relations: { user: true },
        where: { companyProfile: { id } },
      });
      const resetPasswordId = uuidv4();

      await this.userRepository.update(client.user.id, {
        resetPasswordId,
        isEmailConfirmed: true,
      });

      await this.companyProfileRepository.update(id, {
        state: CompanyStateEnum.INVITED,
      });

      await this.emailService.sendResetEmail(
        resetPasswordId,
        client.user.email,
      );
      return this.companyProfileRepository.findOne({ where: { id } });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(`Can't invite user`);
    }
  }

  async block(id: number): Promise<CompanyProfile> {
    try {
      const profile = await this.companyProfileRepository.findOne({
        where: { id },
      });

      if (profile.state !== CompanyStateEnum.REG) {
        throw new InternalServerErrorException(
          'User can be blocked only when registred',
        );
      }

      await this.companyProfileRepository.update(id, {
        state: CompanyStateEnum.BLOCKED,
      });
      return this.companyProfileRepository.findOne({ where: { id } });
    } catch (err) {
      throw new InternalServerErrorException(`Can't block user`);
    }
  }

  async unblock(id: number): Promise<CompanyProfile> {
    try {
      await this.companyProfileRepository.update(id, {
        state: CompanyStateEnum.REG,
      });

      return this.companyProfileRepository.findOne({ where: { id } });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(`Can't unblock user`);
    }
  }
}
