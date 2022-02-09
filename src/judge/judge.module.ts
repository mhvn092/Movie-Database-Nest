import { Global, Module } from '@nestjs/common';
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
import { UtilityModule } from 'src/utility/utility.module';
import { AuthModule } from 'src/auth/auth.module';
import { LoggerModule } from 'src/logger/logger.module';
import { RolesModule } from 'src/roles/roles.module';

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
