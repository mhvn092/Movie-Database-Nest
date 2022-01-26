import { forwardRef, Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { GenreEntity } from 'src/genre/entities/genre.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { DirectorEntity } from './entities/director.entity';
import { MovieModule } from 'src/movie/movie.module';
import { GenreModule } from 'src/genre/genre.module';

@Module({
  imports:[TypeOrmModule.forFeature([DirectorEntity,MovieEntity,GenreEntity]),
  forwardRef(() =>MovieModule),forwardRef(() =>GenreModule)],
  controllers: [DirectorController],
  providers: [DirectorService],
  exports:[DirectorService]
})
export class DirectorModule {}
