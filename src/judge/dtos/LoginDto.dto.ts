import { PickType } from "@nestjs/swagger";
import { JudgeEntity } from "../entity/judge-entity";


export class LoginDto extends PickType(JudgeEntity,[
    'username','password'] as const){};