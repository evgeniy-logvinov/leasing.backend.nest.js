import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Infrastructure } from './entity/infrustructure.entity';
import { InfrastructureService } from './infrastructure.service';

@ApiTags('LeasingCompany')
@Controller('infrastructure')
export class InfrastructureController {
  constructor(private readonly infrastructureService: InfrastructureService) {}

  @Get()
  getInfrustructure(): Promise<Infrastructure[]> {
    return this.infrastructureService.getAll();
  }
}
