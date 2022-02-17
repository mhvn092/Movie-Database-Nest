import { EntityRepository, Repository } from "typeorm";
import { ActorEntity } from "../actor/entities/actor.entity";

@EntityRepository(ActorEntity)
export class ActorRepository extends Repository<ActorEntity>{}