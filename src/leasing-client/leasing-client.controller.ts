import { Controller, Get } from '@nestjs/common';
import { LeasingClient } from './entity/leasing-client.entity';
import { LeasingClientService } from './leasing-client.service';

@Controller('leasing-client')
export class LeasingClientController {
  constructor(private readonly leasingClientService: LeasingClientService) {}

  @Get()
  getLeasingClient(): Promise<LeasingClient[]> {
    return this.leasingClientService.getAll();
  }
}
