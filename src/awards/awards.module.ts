import { Module } from '@nestjs/common';
import { AwardsService } from './awards.service';
import { AwardsController } from './awards.controller';
import { ActorModule } from '../actor/actor.module';
import { DirectorModule } from '../director/director.module';
import { MovieModule } from '../movie/movie.module';


@Module({
  imports:[MovieModule,ActorModule,DirectorModule],
  controllers: [AwardsController],
  providers: [AwardsService]
})
export class AwardsModule {}
