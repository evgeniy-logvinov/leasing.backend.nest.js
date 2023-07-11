import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LeasingClient } from './entity/leasing-client.entity';
import { LeasingClientService } from './leasing-client.service';

@ApiTags('LeasingClient')
@Controller('leasing-client')
export class LeasingClientController {
  constructor(private readonly leasingClientService: LeasingClientService) {}

  @Get()
  getLeasingClient(): Promise<LeasingClient[]> {
    return this.leasingClientService.getAll();
  }
}
