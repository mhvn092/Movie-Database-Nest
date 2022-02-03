
import { OmitType } from '@nestjs/swagger';
import { JudgeEntity } from '../entity/judge-entity';
export class CreateJudgeDto extends OmitType(JudgeEntity, [
  'BestActor','BestDirector','BestMovie','id'
] as const) {}
