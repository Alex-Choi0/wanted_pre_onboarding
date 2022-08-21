import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { RecruitInfo } from './entities/recurit-info.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Company, RecruitInfo])],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}
