import { Module } from '@nestjs/common';
import { PreferenceFilterService } from './preference-filter.service';
import { PreferenceFilterController } from './preference-filter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreferenceFilter } from './entity/preference-filter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PreferenceFilter])],
  providers: [PreferenceFilterService],
  controllers: [PreferenceFilterController],
})
export class PreferenceFilterModule {}
