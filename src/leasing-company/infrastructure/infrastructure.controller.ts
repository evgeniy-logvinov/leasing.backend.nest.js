import { Controller, Get } from '@nestjs/common';
import { Infrastructure } from './entity/infrustructure.entity';
import { InfrastructureService } from './infrastructure.service';

@Controller('infrastructure')
export class InfrastructureController {
  constructor(private readonly infrastructureService: InfrastructureService) {}

  @Get()
  getInfrustructure(): Promise<Infrastructure[]> {
    return this.infrastructureService.getAll();
  }
}
