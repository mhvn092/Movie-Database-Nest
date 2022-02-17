import {  Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorEntity } from './entities/actor.entity';
import { JudgeEntity } from '../judge/entity/judge-entity';
import { MovieEntity } from '../movie/entities/movie.entity';
import { MovieModule } from '../movie/movie.module';

@Module({
  imports:[TypeOrmModule.forFeature([ActorEntity,MovieEntity,
    JudgeEntity,]),MovieModule],
  controllers: [ActorController],
  providers: [ActorService],
  exports:[ActorService]
})
export class ActorModule {}
