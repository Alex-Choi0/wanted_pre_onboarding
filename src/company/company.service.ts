import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { getManager, Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateRecruitInfoDto } from './dto/create-recruit.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { RecruitInfo } from './entities/recurit-info.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository : Repository<Company>,

    @InjectRepository(RecruitInfo)
    private readonly recruitInfoRepository : Repository<RecruitInfo>
  ){

  }
  async createCompany(dto: CreateCompanyDto) {
    try {

      const exist = await this.companyRepository.findOne({where : {name : dto.name}})
      if(exist){
        throw new ConflictException('이미 같은 회사명이 존재합니다.')
      }

      return await this.companyRepository.save(dto);

    } catch (err){
      throw new HttpException(err.message, err.status ? err.status : 500);
    }
  }

  async createRecruit(dto: CreateRecruitInfoDto) {
    try {

      const exist = await this.companyRepository.findOne({where : {id : dto.companyId}})
      if(!exist){
        throw new NotFoundException('해당 아이디의 회사를 찾지 못했습니다.')
      }      

      return await this.recruitInfoRepository.save(dto);

    } catch (err){
      throw new HttpException(err.message, err.status ? err.status : 500);
    }
  }



  async findOneRecruit(id: number) {
    try {

      const exist = await this.recruitInfoRepository.findOne({where : {id}})
      const result : object = {};
      if(!exist){
        throw new NotFoundException('해당 아이디의 구인공고를 찾지 못했습니다.')
      } else {
        result['회사명'] = (await this.companyRepository.findOne({where : {id : exist.companyId}}))['name'];
        result['채용공고_id'] = exist.id;
        result['국가'] = exist.nation;
        result['지역'] = exist.area;
        result['채용포지션'] = exist.position;
        result['채용보상금'] = exist.reward;
        result['사용기술'] = exist.stack;
        result['회사가올린다른채용공고'] = (await this.recruitInfoRepository.find({where : {companyId : exist.companyId}, select : ['id']})).map((ele) => {
          return ele.id
        }).filter(ele => ele != exist.id)
      }      

      

      return result;

    } catch (err){
      throw new HttpException(err.message, err.status ? err.status : 500);
    }
  }

  async findAllRecruit(skip : number, take : number) {
    try {

      const data = await getManager().query(`
      SELECT recruit_info.id AS "채용공고_id", name AS "회사명", nation AS "국가", area AS "지역", position AS "채용포지션", reward AS "채용보상금", stack AS "사용기술" FROM recruit_info LEFT JOIN company ON company.id="companyId" LIMIT ${take} OFFSET ${skip}
      `)    

      return data;

    } catch (err){
      throw new HttpException(err.message, err.status ? err.status : 500);
    }
  }

  async update(id: number, dto: UpdateCompanyDto) {
  try {
      const exist = await this.recruitInfoRepository.findOne({where : {id}})
      if(!exist){
        throw new NotFoundException('해당 아이디의 구인공고를 찾지 못했습니다.')
      } 

      const updateRecruit = this.recruitInfoRepository.create({...exist, ...dto})

      return await this.recruitInfoRepository.save(updateRecruit);

    } catch (err){
      throw new HttpException(err.message, err.status ? err.status : 500);
    }
  }


  async remove(id: number) {
  try {
      const exist = await this.recruitInfoRepository.findOne({where : {id}})
      if(!exist){
        throw new NotFoundException('해당 아이디의 구인공고를 찾지 못했습니다.')
      } 

      return await this.recruitInfoRepository.delete(id)

    } catch (err){
      throw new HttpException(err.message, err.status ? err.status : 500);
    }
  }

  async searchKeyWord(search : string, skip : number, take : number){
    try {

      const data = await getManager().query(`
      SELECT recruit_info.id AS "채용공고_id", name AS "회사명", nation AS "국가", area AS "지역", position AS "채용포지션", reward AS "채용보상금", stack AS "사용기술" FROM recruit_info 
      LEFT JOIN company ON company.id="companyId" 
      WHERE name LIKE '%${search}%' OR
      nation LIKE '%${search}%' OR
      area LIKE '%${search}%' OR
      position LIKE '%${search}%' OR
      reward::text LIKE '%${search}%' OR
      stack::text LIKE '%${search}%' 
      LIMIT ${take} OFFSET ${skip}
      `)    

      return data;

    } catch (err){
      throw new HttpException(err.message, err.status ? err.status : 500);
    }
  }
}
