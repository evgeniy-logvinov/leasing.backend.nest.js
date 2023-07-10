import { Module } from '@nestjs/common';
import { InfrastructureService } from './infrastructure.service';
import { InfrastructureController } from './infrastructure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Infrastructure } from './entity/infrustructure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Infrastructure])],
  providers: [InfrastructureService],
  controllers: [InfrastructureController],
})
export class InfrastructureModule {}
