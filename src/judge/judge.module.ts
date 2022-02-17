import { Global, Module } from '@nestjs/common';
import { JudgeService } from './judge.service';
import { JudgeController } from './judge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JudgeEntity } from './entity/judge-entity';
import { ActorModule } from '../actor/actor.module';
import { ActorEntity } from '../actor/entities/actor.entity';
import { AuthModule } from '../auth/auth.module';
import { DirectorModule } from '../director/director.module';
import { DirectorEntity } from '../director/entities/director.entity';
import { LoggerModule } from '../logger/logger.module';
import { MovieEntity } from '../movie/entities/movie.entity';
import { MovieModule } from '../movie/movie.module';
import { RolesModule } from '../roles/roles.module';
import { UtilityModule } from '../utility/utility.module';


@Global()
@Module({
  imports:[TypeOrmModule.forFeature([JudgeEntity,MovieEntity,
    ActorEntity,DirectorEntity]),MovieModule,ActorModule,
    DirectorModule,UtilityModule,AuthModule,LoggerModule,
    RolesModule],
  controllers: [JudgeController],
  providers: [JudgeService],
  exports:[JudgeService]
})
export class JudgeModule {}
