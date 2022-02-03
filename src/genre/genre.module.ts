import { forwardRef, Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectorEntity } from 'src/director/entities/director.entity';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { GenreEntity } from './entities/genre.entity';
import { MovieModule } from 'src/movie/movie.module';
import { DirectorModule } from 'src/director/director.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports:[TypeOrmModule.forFeature([DirectorEntity,MovieEntity,GenreEntity])
  ,forwardRef(() =>MovieModule),forwardRef(() =>DirectorModule),TokenModule],
  controllers: [GenreController],
  providers: [GenreService],
  exports:[GenreService]
})
export class GenreModule {}
