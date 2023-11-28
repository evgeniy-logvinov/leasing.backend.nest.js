import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProfile } from './client-profile/entity/client-profile.entity';
import { LeasingClient } from './entity/leasing-client.entity';
import { CreateClientDto } from 'src/user/dto/create-client.dto';
import { RoleEnum } from 'src/user/enum/RoleEnum';
import { User } from 'src/user/entity/user.entity';
import { RoleService } from 'src/user/role/role.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LeasingClientService {
  constructor(
    @InjectRepository(LeasingClient)
    private leasingClientRepository: Repository<LeasingClient>,
    @InjectRepository(ClientProfile)
    private clientProfileRepository: Repository<ClientProfile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
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
    id: string,
    description: string,
  ): Promise<{ message: string }> {
    try {
      this.leasingClientRepository.update(id, { description });
      return { message: 'Description saved' };
    } catch (err) {
      throw new InternalServerErrorException(`Can't set description`);
    }
  }

  async invite(id: string): Promise<ClientProfile> {
    try {
      const leasingClient = await this.leasingClientRepository.findOne({
        relations: { user: true },
        where: { clientProfile: { id } },
      });

      await this.userService.invite(leasingClient.user.id);

      return leasingClient.clientProfile;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(`Can't invite user`);
    }
  }

  async block(id: string): Promise<ClientProfile> {
    try {
      const leasingClient = await this.leasingClientRepository.findOne({
        relations: { user: true },
        where: { clientProfile: { id } },
      });

      await this.userService.block(leasingClient.user.id);

      return leasingClient.clientProfile;
    } catch (err) {
      throw new InternalServerErrorException(`Can't block user`);
    }
  }

  async unblock(id: string): Promise<ClientProfile> {
    try {
      const leasingClient = await this.leasingClientRepository.findOne({
        relations: { user: true },
        where: { clientProfile: { id } },
      });

      await this.userService.unblock(leasingClient.user.id);

      return leasingClient.clientProfile;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(`Can't unblock user`);
    }
  }
}
