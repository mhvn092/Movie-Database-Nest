import { forwardRef, Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorEntity } from './entities/actor.entity';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { MovieModule } from 'src/movie/movie.module';
import { JudgeEntity } from 'src/judge/entity/judge-entity';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports:[TypeOrmModule.forFeature([ActorEntity,MovieEntity,
    JudgeEntity]),forwardRef(() =>MovieModule),TokenModule],
  controllers: [ActorController],
  providers: [ActorService],
  exports:[ActorService]
})
export class ActorModule {}
