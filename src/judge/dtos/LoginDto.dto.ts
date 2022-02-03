import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { CreateJudgeDto } from "./CreateJudgeDto.dto";


export class LoginDto extends PartialType(CreateJudgeDto){
    @ApiProperty()
    username?: string;
    @ApiProperty()
    password?: string;
};