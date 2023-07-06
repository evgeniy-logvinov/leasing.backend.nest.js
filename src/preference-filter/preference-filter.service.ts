import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PreferenceFilter } from './entity/preference-filter.entity';

@Injectable()
export class PreferenceFilterService {
  constructor(
    @InjectRepository(PreferenceFilter)
    private preferenceFilterRepository: Repository<PreferenceFilter>,
  ) {}

  getAll(): Promise<PreferenceFilter[]> {
    return this.preferenceFilterRepository.find({});
  }
}
