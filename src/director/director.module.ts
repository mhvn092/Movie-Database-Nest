import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { GenreEntity } from 'src/genre/entities/genre.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { DirectorEntity } from './entities/director.entity';
import { JudgeEntity } from 'src/judge/entity/judge-entity';
import { TokenModule } from 'src/token/token.module';
import { GenreRepository } from 'src/repositories/genreRepository.Repositroy';
import { MovieModule } from 'src/movie/movie.module';

@Module({
  imports:[TypeOrmModule.forFeature([DirectorEntity,MovieEntity,
    GenreEntity,GenreRepository,JudgeEntity]),
  TokenModule,MovieModule],
  controllers: [DirectorController],
  providers: [DirectorService],
  exports:[DirectorService]
})
export class DirectorModule {}
