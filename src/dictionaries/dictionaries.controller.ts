import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DictionariesService } from './dictionaries.service';
import { Area } from './entity/area.entity';
import { City } from './entity/city.entity';
import { Country } from './entity/country.entity';
import { District } from './entity/district.entity';

@ApiTags('Dictionaries')
@Controller('dictionaries')
export class DictionariesController {
  constructor(private readonly dictionariesService: DictionariesService) {}

  @Get('/city')
  getAll(): Promise<Country[]> {
    return this.dictionariesService.getAll();
  }

  @Get('/city/all')
  getAllCities(): Promise<City[]> {
    return this.dictionariesService.getAllCities();
  }

  @Get('/city/district')
  getAllDistricts(): Promise<District[]> {
    return this.dictionariesService.getAllDistricts();
  }

  @Get('/city/area')
  getAllAreas(): Promise<Area[]> {
    return this.dictionariesService.getAllArea();
  }

  @Get('/city/country')
  getAllCountries(): Promise<Country[]> {
    return this.dictionariesService.getAllCountries();
  }
}
