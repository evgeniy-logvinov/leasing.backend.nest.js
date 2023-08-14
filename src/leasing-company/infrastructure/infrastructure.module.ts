import { Module } from '@nestjs/common';
import { InfrastructureService } from './infrastructure.service';
import { InfrastructureController } from './infrastructure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Infrastructure } from './entity/infrustructure.entity';
import { AnaliticsDepartment } from './entity/analitics-department.entity';
import { Employee } from './entity/employee.entity';
import { Analitic } from './entity/analitic.entity';
import { SalesDepartment } from './entity/sales-department.entity';
import { CityManager } from './entity/city-manager.entity';
import { Manager } from './entity/manager.entity';
import { LeasingCompany } from '../entity/leasing-company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Infrastructure,
      AnaliticsDepartment,
      Employee,
      Analitic,
      SalesDepartment,
      CityManager,
      Manager,
      LeasingCompany,
    ]),
  ],
  providers: [InfrastructureService],
  controllers: [InfrastructureController],
})
export class InfrastructureModule {}
