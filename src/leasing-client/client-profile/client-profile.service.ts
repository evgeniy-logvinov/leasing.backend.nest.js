import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeasingClient } from '../entity/leasing-client.entity';
import { UpdateClientProfileDto } from './dto/update-client-profile.dto';
import { ClientProfile } from './entity/client-profile.entity';

@Injectable()
export class ClientProfileService {
  constructor(
    @InjectRepository(ClientProfile)
    private clientProfileRepository: Repository<ClientProfile>,
    @InjectRepository(LeasingClient)
    private leasingClientRepository: Repository<LeasingClient>,
  ) {}

  getAll(): Promise<ClientProfile[]> {
    return this.clientProfileRepository.find();
  }

  async getByUserId(id: string): Promise<ClientProfile> {
    const client = await this.leasingClientRepository.findOneOrFail({
      where: { user: { id } },
      relations: { clientProfile: true },
    });

    if (!client?.clientProfile?.id) {
      throw new InternalServerErrorException('Client profile not exists');
    }

    return this.clientProfileRepository.findOne({
      where: { id: client.clientProfile.id },
    });
  }

  async updateProfile(
    userId: string,
    newProfile: UpdateClientProfileDto,
  ): Promise<{ message: string }> {
    const client = await this.leasingClientRepository.findOneOrFail({
      where: { user: { id: userId } },
      relations: { clientProfile: true },
    });

    if (!client) {
      throw new InternalServerErrorException('Client not found');
    }

    const { fullName, inn, shortName, state, id } = newProfile;

    try {
      await this.clientProfileRepository.update(id, {
        fullName,
        inn,
        shortName,
        state,
      });

      return { message: 'Client profile successfully updated!' };
    } catch (error) {
      // postgresql
      if (error.code === '23505') {
        throw new ConflictException('Client profile already exists');
      }
      // For mysql
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Client profile already exists');
      }
      console.log('err', error);
      throw new InternalServerErrorException();
    }
  }
}
