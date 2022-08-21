import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ApplyRecruit } from './dto/apply-recruit.dto';
import { number } from '@hapi/joi';

@ApiTags('유저 API')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary : '유저가입',
    description : 'DB에 유저를 저장합니다.'
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Delete(':userId')
  @ApiOperation({
    summary : '유저 삭제',
    description : '해당 유저ID를 DB에서 삭제한다'
  })
  @ApiParam({
    name : 'userId',
    type : Number,
    description : "삭제할 유저ID",
    example : 1,
  })
  delete(@Param('userId') userId : string){
    return this.usersService.delete(userId)
  }

  @Post('apply/recruit')
  @ApiOperation({
    summary : '채용공고 지원',
    description : '유저가 채용공고에 지원을 한다. 한 채용공고에 지원자가 한번만 지원할수 있습니다.',
  })
  applyRecruit(@Body() applyRecruit : ApplyRecruit){
    return this.usersService.applyResume(applyRecruit)
  }

  @Get(':userId')
  @ApiOperation({
    summary : '지원한 공고 확인하기',
    description : '해당 유저ID를 조회하여 지원한 채용공고를 확인한다.'
  })
  @ApiParam({
    name : 'userId',
    type : Number,
    description : 'DB에 저장된 유저ID',
    example : 2
  })
  async findOneUser(@Param('userId') userId : number){
    return this.usersService.findOneByApply(userId)
  }
  
}
