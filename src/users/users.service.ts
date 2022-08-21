import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecruitInfo } from 'src/company/entities/recurit-info.entity';
import { getManager, Repository } from 'typeorm';
import { ApplyRecruit } from './dto/apply-recruit.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRecruitJoin } from './entities/user-recruit-join.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository : Repository<User>,
    @InjectRepository(RecruitInfo)
    private readonly recruitInfoRepository : Repository<RecruitInfo>,
    @InjectRepository(UsersRecruitJoin)
    private readonly usersRecruitJoinRepository : Repository<UsersRecruitJoin>
  ){}
  async create(dto: CreateUserDto) {
    return await this.usersRepository.save(dto);
  }

 async delete(userId : string){
   return await this.usersRepository.delete(userId)
 } 


 async applyResume(applyRecruit : ApplyRecruit){
   try{
    const userId : number = applyRecruit['사용자_id'];
    const recruitId : number = applyRecruit['채용공고_id'];

    const exist1 = await this.findOne(userId)
    const exist2 = await this.recruitInfoRepository.findOne(recruitId)
    const exist3 : UsersRecruitJoin = await this.usersRecruitJoinRepository.findOne({
      where : {
        userId,
        recruitId
      }
    })

  if(!exist1) throw new NotFoundException('해당 유저의 ID는 존재하지 않습니다.');
  else if(!exist2) throw new NotFoundException('해당 채용공고ID는 존재하지 않습니다.');
  else if(exist3) throw new ConflictException('이미 해당 채용공고에 지원했습니다.')

  return this.usersRecruitJoinRepository.save({
    userId,
    recruitId
  })


  } catch(err){
    throw new HttpException(err.message, err.status ? err.status : 500);
  }
   
 }

 async findOneByApply(userId : number){
  try{

  const exist1 = await this.findOne(userId)

  if(!exist1) throw new NotFoundException('해당 유저의 ID는 존재하지 않습니다.');
  return await getManager().query(`
  SELECT recruit_info.id AS "recruitId",nation, area, position, reward, stack, created_at FROM users LEFT JOIN users_recruit_join ON users.id="userId" LEFT JOIN recruit_info ON recruit_info.id="recruitId" WHERE users.id=${userId}
  `)
  } catch(err){
    throw new HttpException(err.message, err.status ? err.status : 500);
  }
 }

 async findOne(userId : number){
   return await this.usersRepository.findOne({where : {id : userId}})
 }
}
