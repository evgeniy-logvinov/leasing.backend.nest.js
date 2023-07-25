import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/email/services/email.service';
import { User } from 'src/user/entity/user.entity';
import { ClientStateEnum } from 'src/user/enum/ClientStateEnum';
import { Repository } from 'typeorm';
import { ClientProfile } from './client-profile/entity/client-profile.entity';
import { LeasingClient } from './entity/leasing-client.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LeasingClientService {
  constructor(
    @InjectRepository(LeasingClient)
    private userRepository: Repository<User>,
    @InjectRepository(LeasingClient)
    private leasingClientRepository: Repository<LeasingClient>,
    @InjectRepository(ClientProfile)
    private clientProfileRepository: Repository<ClientProfile>,
    private emailService: EmailService,
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
      const inviteId = uuidv4();
      this.leasingClientRepository.update(client.id, { inviteId });
      await this.clientProfileRepository.update(id, {
        state: ClientStateEnum.INVITED,
      });

      await this.emailService.sendInviteEmail(inviteId, client.user.email);
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
