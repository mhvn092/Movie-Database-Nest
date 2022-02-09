import { ApiProperty } from "@nestjs/swagger"
import { IsString, Matches, MinLength } from "class-validator";

export class CreateJudgeDto {
  @IsString()
  @ApiProperty()
  name:string
  @ApiProperty()
  @IsString()
  username:string
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {message:'Password not strong enough baby'})
  password:string
  @ApiProperty()
  @IsString({each:true})
  roles:string[];
}
