import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Min } from "class-validator";

export class ApplyRecruit{
    @IsNumber()
    @Min(1)
    @ApiProperty({
        name : '채용공고_id',
        type : Number,
        description : '지원할 채용공고 ID',
        example : 5
    })
    '채용공고_id' : number;

    @IsNumber()
    @Min(1)
    @ApiProperty({
        name : '사용자_id',
        type : Number,
        description : '사용자(유저)ID를 입력합니다.',
        example : 2
    })
    '사용자_id' : number;
}