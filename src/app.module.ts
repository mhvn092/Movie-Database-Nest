import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActorModule } from './actor/actor.module';
import { MovieModule } from './movie/movie.module';
import { DirectorModule } from './director/director.module';
import { GenreModule } from './genre/genre.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JudgeModule } from './judge/judge.module';
import { AwardsModule } from './awards/awards.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "123",
      extra: {
        trustServerCertificate: true,
      },
      database: "typeorm",
      synchronize: true,
    autoLoadEntities: true,
  }),ActorModule, MovieModule, DirectorModule, GenreModule, JudgeModule, AwardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
