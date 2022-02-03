import { GenreEntity } from "src/genre/entities/genre.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(GenreEntity)
export class GenreRepository extends Repository<GenreEntity>{}