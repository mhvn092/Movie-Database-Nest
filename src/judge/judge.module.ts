import { Module } from '@nestjs/common';
import { JudgeService } from './judge.service';
import { JudgeController } from './judge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JudgeEntity } from './entity/judge-entity';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { ActorEntity } from 'src/actor/entities/actor.entity';
import { DirectorEntity } from 'src/director/entities/director.entity';
import { MovieModule } from 'src/movie/movie.module';
import { ActorModule } from 'src/actor/actor.module';
import { DirectorModule } from 'src/director/director.module';

@Module({
  imports:[TypeOrmModule.forFeature([JudgeEntity,MovieEntity,
    ActorEntity,DirectorEntity]),MovieModule,ActorModule,DirectorModule],
  controllers: [JudgeController],
  providers: [JudgeService],
  exports:[JudgeService]
})
export class JudgeModule {}
