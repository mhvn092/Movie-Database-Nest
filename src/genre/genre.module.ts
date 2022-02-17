import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectorEntity } from '../director/entities/director.entity';
import { MovieEntity } from '../movie/entities/movie.entity';
import { MovieModule } from '../movie/movie.module';
import { DirectorRepository } from '../repositories/directorRepository.Repository';
import { GenreEntity } from './entities/genre.entity';


@Module({
  imports:[TypeOrmModule.forFeature([DirectorEntity,MovieEntity,
    GenreEntity,DirectorRepository,])
  ,MovieModule],
  controllers: [GenreController],
  providers: [GenreService]
})
export class GenreModule {}
