import { forwardRef, Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { GenreEntity } from 'src/genre/entities/genre.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { DirectorEntity } from './entities/director.entity';
import { MovieModule } from 'src/movie/movie.module';
import { GenreModule } from 'src/genre/genre.module';
import { JudgeEntity } from 'src/judge/entity/judge-entity';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports:[TypeOrmModule.forFeature([DirectorEntity,MovieEntity,GenreEntity,JudgeEntity]),
  forwardRef(() =>MovieModule),forwardRef(() =>GenreModule),TokenModule],
  controllers: [DirectorController],
  providers: [DirectorService],
  exports:[DirectorService]
})
export class DirectorModule {}
