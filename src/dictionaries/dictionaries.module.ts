import { Module } from '@nestjs/common';
import { DictionariesService } from './dictionaries.service';
import { DictionariesController } from './dictionaries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entity/city.entity';
import { District } from './entity/district.entity';
import { Area } from './entity/area.entity';
import { Country } from './entity/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, District, Area, Country])],
  providers: [DictionariesService],
  controllers: [DictionariesController],
})
export class DictionariesModule {}
