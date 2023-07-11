import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApplicationService } from './application.service';
import { Application } from './entity/application.entity';

@ApiTags('LeasingClient')
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  getClientProfile(): Promise<Application[]> {
    return this.applicationService.getAll();
  }
}
