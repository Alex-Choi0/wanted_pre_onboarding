import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRecruitJoin } from './entities/user-recruit-join.entity';
import { RecruitInfo } from 'src/company/entities/recurit-info.entity';

@Module({
  imports : [TypeOrmModule.forFeature([User, UsersRecruitJoin, RecruitInfo])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
