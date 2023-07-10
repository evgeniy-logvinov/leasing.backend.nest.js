import { Controller, Get } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Application } from './entity/application.entity';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  getClientProfile(): Promise<Application[]> {
    return this.applicationService.getAll();
  }
}
