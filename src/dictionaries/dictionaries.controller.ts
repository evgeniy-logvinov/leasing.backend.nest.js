import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DictionariesService } from './dictionaries.service';
import { Area } from './entity/area.entity';
import { City } from './entity/city.entity';
import { Country } from './entity/country.entity';
import { District } from './entity/district.entity';

@ApiBearerAuth()
@ApiTags('Dictionaries')
@Controller('dictionaries')
@UseGuards(AuthGuard())
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
