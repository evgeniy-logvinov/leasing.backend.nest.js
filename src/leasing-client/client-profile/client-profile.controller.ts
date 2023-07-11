import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProfileService } from './client-profile.service';
import { ClientProfile } from './entity/client-profile.entity';

@ApiTags('LeasingClient')
@Controller('client-profile')
export class ClientProfileController {
  constructor(private readonly clientProfileService: ClientProfileService) {}

  @Get()
  getClientProfile(): Promise<ClientProfile[]> {
    return this.clientProfileService.getAll();
  }
}
