import { ApiProperty } from "@nestjs/swagger"

export class CreateJudgeDto {
  @ApiProperty()
  name:string
  @ApiProperty()
  username:string
  @ApiProperty()
  password:string
}
