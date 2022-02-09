import { PickType } from "@nestjs/swagger";
import { CreateJudgeDto } from "./CreateJudgeDto.dto";

export class UpdateJudgeDto extends PickType(CreateJudgeDto,['roles'] as const){}