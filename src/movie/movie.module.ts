import { forwardRef, Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectorEntity } from 'src/director/entities/director.entity';
import { GenreEntity } from 'src/genre/entities/genre.entity';
import { MovieEntity } from './entities/movie.entity';
import { DirectorModule } from 'src/director/director.module';
import { ActorModule } from 'src/actor/actor.module';
import { GenreModule } from 'src/genre/genre.module';
import { JudgeEntity } from 'src/judge/entity/judge-entity';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports:[TypeOrmModule.forFeature([MovieEntity,DirectorEntity,GenreEntity,JudgeEntity]),
  forwardRef(() =>DirectorModule),forwardRef(() =>ActorModule),
  forwardRef(() =>GenreModule),TokenModule],
  controllers: [MovieController],
  providers: [MovieService],
  exports:[MovieService]
})
export class MovieModule {}
