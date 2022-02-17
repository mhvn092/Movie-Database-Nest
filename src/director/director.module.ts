import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreEntity } from '../genre/entities/genre.entity';
import { JudgeEntity } from '../judge/entity/judge-entity';
import { MovieEntity } from '../movie/entities/movie.entity';
import { MovieModule } from '../movie/movie.module';
import { GenreRepository } from '../repositories/genreRepository.Repositroy';
import { DirectorEntity } from './entities/director.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DirectorEntity,MovieEntity,
    GenreEntity,GenreRepository,JudgeEntity,]),MovieModule],
  controllers: [DirectorController],
  providers: [DirectorService],
  exports:[DirectorService]
})
export class DirectorModule {}
