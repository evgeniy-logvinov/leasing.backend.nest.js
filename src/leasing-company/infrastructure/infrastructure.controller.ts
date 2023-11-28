import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { getUserIdFromReq } from 'src/utils/user';
import { Employee } from './entity/employee.entity';
import { Infrastructure } from './entity/infrustructure.entity';
import { InfrastructureService } from './infrastructure.service';

@ApiBearerAuth()
@ApiTags('Infrastructure')
@Controller('infrastructure')
@UseGuards(AuthGuard())
export class InfrastructureController {
  constructor(private readonly infrastructureService: InfrastructureService) {}

  @Get()
  getInfrustructure(@Req() req: Request): Promise<Infrastructure> {
    const userId = getUserIdFromReq(req);
    return this.infrastructureService.getByUserId(userId);
  }
  // TODO: check if user can see infrustructure
  @Get('/all')
  getAllEmployees(@Req() req: Request): Promise<Employee[]> {
    const userId = getUserIdFromReq(req);
    return this.infrastructureService.getAllEmployees(userId);
  }
}
