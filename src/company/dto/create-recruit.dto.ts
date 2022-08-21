import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateRecruitInfoDto {
    @IsNumber()
    @Min(1)
    @ApiProperty({
        type : Number,
        description : '회사_id 입력(정수)',
        name : 'companyId',
        example : 1
    })
    companyId : number;

    @IsString()
    @ApiProperty({
        type : String,
        description : '국가 입력',
        name : 'nation',
        example : "한국",
    })
    nation : string;

    @IsString()
    @ApiProperty({
        type : String,
        description : '지역 입력',
        name : 'area',
        example : "서울",
    })
    area : string;

    @IsString()
    @ApiProperty({
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
