import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { DirectorEntity } from '../director/entities/director.entity';
import { GenreEntity } from '../genre/entities/genre.entity';
import { JudgeEntity } from '../judge/entity/judge-entity';
import { ActorRepository } from '../repositories/actorRepository.Repository';
import { DirectorRepository } from '../repositories/directorRepository.Repository';
import { GenreRepository } from '../repositories/genreRepository.Repositroy';


@Module({
  imports:[TypeOrmModule.forFeature([MovieEntity,DirectorEntity,
    GenreEntity,JudgeEntity,GenreRepository,ActorRepository,DirectorRepository]),],
  controllers: [MovieController],
  providers: [MovieService],
  exports:[MovieService]
})
export class MovieModule {}
