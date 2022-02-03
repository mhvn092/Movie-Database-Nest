
import { DirectorEntity } from "src/director/entities/director.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(DirectorEntity)
export class DirectorRepository extends Repository<DirectorEntity>{}