import { Module } from '@nestjs/common';
import { AwardsService } from './awards.service';
import { AwardsController } from './awards.controller';
import { MovieModule } from 'src/movie/movie.module';
import { ActorModule } from 'src/actor/actor.module';
import { DirectorModule } from 'src/director/director.module';

@Module({
  imports:[MovieModule,ActorModule,DirectorModule],
  controllers: [AwardsController],
  providers: [AwardsService]
})
export class AwardsModule {}
