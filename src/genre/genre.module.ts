import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectorEntity } from 'src/director/entities/director.entity';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { GenreEntity } from './entities/genre.entity';
import { MovieModule } from 'src/movie/movie.module';
import { DirectorRepository } from 'src/repositories/directorRepository.Repository';


@Module({
  imports:[TypeOrmModule.forFeature([DirectorEntity,MovieEntity,
    GenreEntity,DirectorRepository,])
  ,MovieModule],
  controllers: [GenreController],
  providers: [GenreService]
})
export class GenreModule {}
