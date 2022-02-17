import { EntityRepository, Repository } from "typeorm";
import { DirectorEntity } from "../director/entities/director.entity";

@EntityRepository(DirectorEntity)
export class DirectorRepository extends Repository<DirectorEntity>{}