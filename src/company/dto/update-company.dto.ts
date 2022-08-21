import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { CreateCompanyDto } from './create-company.dto';

export class UpdateCompanyDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        required : false,
        type : String,
        description : '국가 입력',
        name : 'nation',
        example : "한국",
    })
    nation : string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        required : false,
        type : String,
        description : '지역 입력',
        name : 'area',
        example : "서울",
    })
    area : string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        required : false,
        type : String,
        description : '채용포지션 입력',
        name : 'position',
        example : "백엔드 주니어 개발자",
    })
    position : string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    @ApiProperty({
        required : false,
        type : Number,
        description : '채용보상금 입력',
        name : 'reward',
        example : 1000000,
    })
    reward : number;

    @IsString({each : true})
    @IsOptional()
    @ApiProperty({
        required : false,
        type : String,
        description : '사용기술 입력',
        name : 'stack',
        example : ['Python', 'Django']
    })
    stack : string[];
}
