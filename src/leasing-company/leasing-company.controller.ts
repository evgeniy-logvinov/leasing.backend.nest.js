import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateCompanyDto } from 'src/user/dto/create-company.dto';
import { UserService } from 'src/user/user.service';
import { getUserIdFromReq } from 'src/utils/user';
import { CompanyProfile } from './company-profile/entity/company-profile.entity';
import { LeasingCompany } from './entity/leasing-company.entity';
import { LeasingCompanyService } from './leasing-company.service';

@ApiBearerAuth()
@ApiTags('LeasingCompany')
@Controller('leasing-company')
@UseGuards(AuthGuard())
export class LeasingCompanyController {
  constructor(
    private readonly leasingCompanyService: LeasingCompanyService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async getLeasingCompany(@Req() req: Request): Promise<LeasingCompany[]> {
    await this.adminCheck(req);
    return this.leasingCompanyService.getAll();
  }

  @Post()
  async createCompany(
    @Req() req: Request,
    @Body(ValidationPipe) company: CreateCompanyDto,
  ): Promise<{ message: string }> {
    await this.adminCheck(req);
    return this.leasingCompanyService.createCompany(company);
  }

  @Post('/description')
  async setDescription(
    @Req() req: Request,

    @Body(ValidationPipe)
    { id, description }: { id: string; description: string },
  ): Promise<{ message: string }> {
    await this.adminCheck(req);
    return this.leasingCompanyService.setDescription(id, description);
  }

  @Post('/invite/:id')
  async invite(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<CompanyProfile> {
    await this.adminCheck(req);
    return this.leasingCompanyService.invite(id);
  }

  @Post('/block/:id')
  async block(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<CompanyProfile> {
    await this.adminCheck(req);
    return this.leasingCompanyService.block(id);
  }

  @Post('/unblock/:id')
  async unblock(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<CompanyProfile> {
    await this.adminCheck(req);
    return this.leasingCompanyService.unblock(id);
  }

  @Post('/accreditation/:id')
  async accreditation(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(ValidationPipe) { accreditation }: { accreditation: boolean },
  ): Promise<CompanyProfile> {
    await this.adminCheck(req);
    return this.leasingCompanyService.accreditation(id, accreditation);
  }

  async adminCheck(req: Request) {
    const userId = getUserIdFromReq(req);
    const admin = await this.userService.adminRole(userId);
    if (!admin) {
      throw new ForbiddenException('Access denied');
    }
  }
}
