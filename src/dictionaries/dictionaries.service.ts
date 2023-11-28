import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './entity/area.entity';
import { City } from './entity/city.entity';
import { Country } from './entity/country.entity';
import { District } from './entity/district.entity';

@Injectable()
export class DictionariesService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(District)
    private districtRepository: Repository<District>,
    @InjectRepository(Area)
    private areaRepository: Repository<Area>,
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  getAll(): Promise<Country[]> {
    return this.countryRepository.find({
      relations: {
        children: {
          children: {
            children: true,
          },
        },
      },
    });
  }

  getAllCities(): Promise<City[]> {
    return this.cityRepository.find();
  }

  getAllDistricts(): Promise<District[]> {
    return this.districtRepository.find();
  }

  getAllArea(): Promise<Area[]> {
    return this.areaRepository.find();
  }

  getAllCountries(): Promise<Country[]> {
    return this.countryRepository.find();
  }
}
