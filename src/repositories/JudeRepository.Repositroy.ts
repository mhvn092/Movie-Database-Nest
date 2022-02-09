import { JudgeEntity } from "src/judge/entity/judge-entity";
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(JudgeEntity)
export class judgeRepository extends Repository<JudgeEntity>{
   async  findByUsername(username: string) {
        return await this.findOne({ username });
      }
    async findbyid(id:number){
      return await this.findOne(id);
    }
}