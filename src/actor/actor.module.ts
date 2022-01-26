import { forwardRef, Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorEntity } from './entities/actor.entity';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { MovieModule } from 'src/movie/movie.module';

@Module({
  imports:[TypeOrmModule.forFeature([ActorEntity,MovieEntity]),forwardRef(() =>MovieModule)],
  controllers: [ActorController],
  providers: [ActorService],
  exports:[ActorService]
})
export class ActorModule {}
