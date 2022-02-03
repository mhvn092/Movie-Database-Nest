import { ActorEntity } from "src/actor/entities/actor.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ActorEntity)
export class ActorRepository extends Repository<ActorEntity>{}