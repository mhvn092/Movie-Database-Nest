import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectorEntity } from 'src/director/entities/director.entity';
import { GenreEntity } from 'src/genre/entities/genre.entity';
import { MovieEntity } from './entities/movie.entity';
import { JudgeEntity } from 'src/judge/entity/judge-entity';
import { TokenModule } from 'src/token/token.module';
import { GenreRepository } from 'src/repositories/genreRepository.Repositroy';
import { ActorRepository } from 'src/repositories/actorRepository.Repository';
import { DirectorRepository } from 'src/repositories/directorRepository.Repository';

@Module({
  imports:[TypeOrmModule.forFeature([MovieEntity,DirectorEntity,
    GenreEntity,JudgeEntity,GenreRepository,ActorRepository,DirectorRepository]),TokenModule],
  controllers: [MovieController],
  providers: [MovieService],
  exports:[MovieService]
})
export class MovieModule {}
