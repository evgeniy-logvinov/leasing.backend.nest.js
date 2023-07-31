import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeasingClient } from '../entity/leasing-client.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './entity/application.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    @InjectRepository(LeasingClient)
    private clientRepository: Repository<LeasingClient>,
  ) {}

  getAll(): Promise<Application[]> {
    return this.applicationRepository.find({
      relations: {
        commercialProposal: true,
      },
    });
  }

  getAllByUserId(id: string): Promise<Application[]> {
    return this.applicationRepository.find({
      where: { client: { user: { id } } },
      relations: {
        commercialProposal: true,
      },
    });
  }

  async createApplication(
    newApplication: CreateApplicationDto,
    userId,
  ): Promise<{ message: string }> {
    const client = await this.clientRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!client) {
      throw new InternalServerErrorException('Client not found');
    }

    const {
      isNew,
      returnable,
      ndsPayer,
      brand,
      country,
      model,
      releaseDate,
      subjectOfLeasing,
      typeOfSupplier,
    } = newApplication;

    try {
      const application = new Application();
      application.isNew = isNew;
      application.returnable = returnable;
      application.ndsPayer = ndsPayer;
      application.brand = brand;
      application.country = country;
      application.model = model;
      application.releaseDate = releaseDate;
      application.subjectOfLeasing = subjectOfLeasing;
      application.typeOfSupplier = typeOfSupplier;
      application.client = client;

      await this.applicationRepository.save(application);

      return { message: 'Application successfully created !' };
    } catch (error) {
      // postgresql
      if (error.code === '23505') {
        throw new ConflictException('User already exists');
      }
      // For mysql
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('User already exists');
      }
      console.log('err', error);
      throw new InternalServerErrorException();
    }
  }
}
