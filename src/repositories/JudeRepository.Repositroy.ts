import { EntityRepository, Repository } from "typeorm";
import { JudgeEntity } from "../judge/entity/judge-entity";


@EntityRepository(JudgeEntity)
export class judgeRepository extends Repository<JudgeEntity>{
   async  findByUsername(username: string) {
        return await this.findOne({ username });
      }
    async findbyid(id:number){
      return await this.findOne(id);
    }
}