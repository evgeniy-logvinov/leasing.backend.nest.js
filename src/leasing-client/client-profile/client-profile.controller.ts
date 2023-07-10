import { Controller, Get } from '@nestjs/common';
import { ClientProfileService } from './client-profile.service';
import { ClientProfile } from './entity/client-profile.entity';

@Controller('client-profile')
export class ClientProfileController {
  constructor(private readonly clientProfileService: ClientProfileService) {}

  @Get()
  getClientProfile(): Promise<ClientProfile[]> {
    return this.clientProfileService.getAll();
  }
}
