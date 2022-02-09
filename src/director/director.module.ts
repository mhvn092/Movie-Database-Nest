import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { GenreEntity } from 'src/genre/entities/genre.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { DirectorEntity } from './entities/director.entity';
import { JudgeEntity } from 'src/judge/entity/judge-entity';
import { GenreRepository } from 'src/repositories/genreRepository.Repositroy';
import { MovieModule } from 'src/movie/movie.module';

@Module({
  imports:[TypeOrmModule.forFeature([DirectorEntity,MovieEntity,
    GenreEntity,GenreRepository,JudgeEntity,]),MovieModule],
  controllers: [DirectorController],
  providers: [DirectorService],
  exports:[DirectorService]
})
export class DirectorModule {}
