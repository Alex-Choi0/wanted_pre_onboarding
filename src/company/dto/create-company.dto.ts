import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCompanyDto {
    @IsString()
    @ApiProperty({
        type : String,
        description : '회사 명칭 입력',
        name : 'name',
        example : '(주)원티드랩'
    })
    name : string;
}
