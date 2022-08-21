import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @ApiProperty({
        name : 'name',
        type : String,
        description : '유저 이름을 입력합니다.',
        example : "홍길동"
    })
    name : string;
}

