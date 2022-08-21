import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateRecruitInfoDto } from './dto/create-recruit.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiTags('회사 및 회사 공고 등록 API')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({
    summary : '회사 등록',
    description : '회사 등록에 필요한 정보를 입력합니다.'
  })
  async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return{
      data : await this.companyService.createCompany(createCompanyDto),
      message : "회사 등록이 완료"
    }
  }

  @Post('recruit/post')
  @ApiOperation({
    summary : '채용공고 등록',
    description : '해당 회사에 대한 채용공고 필요 정보를 입력합니다.'
  })
  async createRecruitInfo(@Body() createRecruitDto: CreateRecruitInfoDto) {
    return{
      data : await this.companyService.createRecruit(createRecruitDto),
      message : "채용공고 등록 완료"
    }
  }

  @Get('recruit/search')
  @ApiOperation({
    summary : '모든 채용공고를 조회한다',
    description : 'skip, take을 이용하여 모든 채용공고를 조회한다.'
  })
  @ApiQuery({
    name: 'skip',
    description: '스킵할 갯수를 정한다',
    example: 0,
    type: Number,
  })
  @ApiQuery({
    name: 'take',
    description:
      '스킵(skip)다음 불러올 갯수를 정한다',
    example: 10,
    type: Number,
  })
  async searchAllRecruitInfo(@Query('skip') skip: number, @Query('take') take: number){
    return {
      data : await this.companyService.findAllRecruit(skip, take),
      message : '채용공고 조회완료'
    }
  }

  @Get(':recruitId')
  @ApiOperation({
    summary : '단일 채용공고를 조회한다.(채용공고 추가사항 추가)',
    description : '채용공고ID를 이용하여 한개의 채용공고를 조회한다.'
  })
  @ApiParam({
    name : 'recruitId',
    type : Number,
    description : 'DB에 저장된 채용공고ID',
    example : 3
  })
  async searchRecruitInfo(@Param('recruitId') recruitId : number){
    return {
      data : await this.companyService.findOneRecruit(recruitId),
      message : '단일 채용공고 조회완료'
    }
  }


  @Patch(':recruitId')
  @ApiOperation({
    summary : '채용공고를 수정합니다.',
    description : 'recruitId를 이용하여 채용공고를 수정합니다.'
  })
  @ApiParam({
    name : 'recruitId',
    type : Number,
    description : 'DB에 저장된 채용공고ID',
    example : 3
  })
  update(@Param('recruitId') recruitId: number, @Body() updateCompanyDto: UpdateCompanyDto) {
    return {
      data : this.companyService.update(recruitId, updateCompanyDto),
      message : "채용공고 수정 완료"
    }
  }

  @Delete(':recruitId')
  @ApiOperation({
    summary : '채용공고를 삭제합니다.',
    description : 'recruitId를 이용하여 채용공고를 삭제합니다.'
  })
  @ApiParam({
    name : 'recruitId',
    type : Number,
    description : 'DB에 저장된 채용공고ID',
    example : 3
  })
  remove(@Param('recruitId') recruitId: number) {
    return {
      data : this.companyService.remove(recruitId),
      message : "채용공고 삭제 완료"
    }
  }

  @Get('some/url')
  @ApiOperation({
    summary : "채용공고 검색 기능(선택사항 및 가산점요소)",
    description : "키워드를 입력하면 해당 구인공고에서 키워드를 포함한 구인공고를 skip, take기준으로 조회합니다."
  })
  @ApiQuery({
    name : 'search',
    type : String,
    description : '조회할 키워드 입력',
    example : '원티드'
  })
  @ApiQuery({
    name: 'skip',
    description: '스킵할 갯수를 정한다',
    example: 0,
    type: Number,
  })
  @ApiQuery({
    name: 'take',
    description:
      '스킵(skip)다음 불러올 갯수를 정한다',
    example: 10,
    type: Number,
  })
  async searchKeyWord(@Query('search') search : string, @Query('skip') skip: number, @Query('take') take: number){
    return {
      data : await this.companyService.searchKeyWord(search, skip, take),
      message : "조회완료"
    }
  }
}
