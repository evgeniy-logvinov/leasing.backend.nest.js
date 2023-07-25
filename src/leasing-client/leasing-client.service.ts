import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/email/services/email.service';
import { ClientStateEnum } from 'src/user/enum/ClientStateEnum';
import { Repository } from 'typeorm';
import { ClientProfile } from './client-profile/entity/client-profile.entity';
import { LeasingClient } from './entity/leasing-client.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateClientDto } from 'src/user/dto/create-client.dto';
import { RoleEnum } from 'src/user/enum/RoleEnum';
import { User } from 'src/user/entity/user.entity';
import { RoleService } from 'src/user/role/role.service';

@Injectable()
export class LeasingClientService {
  constructor(
    @InjectRepository(LeasingClient)
    private leasingClientRepository: Repository<LeasingClient>,
    @InjectRepository(ClientProfile)
    private clientProfileRepository: Repository<ClientProfile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private emailService: EmailService,
    private roleService: RoleService,
  ) {}

  getAll(): Promise<LeasingClient[]> {
    return this.leasingClientRepository.find({
      select: {
        user: {
          email: true,
        },
      },
      relations: {
        applications: true,
        clientProfile: true,
        user: true,
      },
    });
  }

  async createClient(newClient: CreateClientDto): Promise<{ message: string }> {
    const role = await this.roleService.getRole(RoleEnum.ROLE_LEASING_CLIENT);
    const { email, name, inn } = newClient;

    try {
      const user = new User();
      user.email = email;
      user.role = role;
      await this.userRepository.save(user);

      const clientProfile = new ClientProfile();
      clientProfile.fullName = name;
      clientProfile.inn = inn;
      await this.clientProfileRepository.save(clientProfile);

      const leasingClient = new LeasingClient();
      leasingClient.clientProfile = clientProfile;
      leasingClient.user = user;
      await this.leasingClientRepository.save(leasingClient);

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
      this.leasingClientRepository.update(id, { description });
      return { message: 'Description saved' };
    } catch (err) {
      throw new InternalServerErrorException(`Can't set description`);
    }
  }

  async invite(id: number): Promise<ClientProfile> {
    try {
      const profile = await this.clientProfileRepository.findOne({
        where: { id },
      });

      if (profile.state !== ClientStateEnum.UNREG) {
        throw new InternalServerErrorException(
          'User can be invite only when unregistred',
        );
      }

      const client = await this.leasingClientRepository.findOne({
        relations: { user: true },
        where: { clientProfile: { id } },
      });
      const resetPasswordId = uuidv4();
      await this.userRepository.update(client.user.id, {
        resetPasswordId,
        isEmailConfirmed: true,
      });
      await this.clientProfileRepository.update(id, {
        state: ClientStateEnum.INVITED,
      });

      await this.emailService.sendResetEmail(
        resetPasswordId,
        client.user.email,
      );
      return this.clientProfileRepository.findOne({ where: { id } });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(`Can't invite user`);
    }
  }

  async block(id: number): Promise<ClientProfile> {
    try {
      const profile = await this.clientProfileRepository.findOne({
        where: { id },
      });

      if (profile.state !== ClientStateEnum.REG) {
        throw new InternalServerErrorException(
          'User can be blocked only when registred',
        );
      }

      await this.clientProfileRepository.update(id, {
        state: ClientStateEnum.BLOCKED,
      });
      return this.clientProfileRepository.findOne({ where: { id } });
    } catch (err) {
      throw new InternalServerErrorException(`Can't block user`);
    }
  }

  async unblock(id: number): Promise<ClientProfile> {
    try {
      await this.clientProfileRepository.update(id, {
        state: ClientStateEnum.REG,
      });

      return this.clientProfileRepository.findOne({ where: { id } });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(`Can't unblock user`);
    }
  }
}
