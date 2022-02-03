import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActorModule } from '../actor/actor.module';
import { MovieModule } from '../movie/movie.module';
import { DirectorModule } from '../director/director.module';
import { GenreModule } from '../genre/genre.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JudgeModule } from '../judge/judge.module';
import { AwardsModule } from '../awards/awards.module';
import { LoggerModule } from '../logger/logger.module';
import { APP_FILTER } from '@nestjs/core';
import { LogExceptionFilter } from '../common/filter/exception-filter.filter';
import { TokenModule } from 'src/token/token.module';
import { SimpleMiddleware } from 'src/common/middleware/simple.middleware';
import { UtilityModule } from 'src/utility/utility.module';
import { AuthModule } from 'src/auth/auth.module';

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
      database: "movie",
      synchronize: true,
    autoLoadEntities: true,
  }),ActorModule, MovieModule, DirectorModule, GenreModule,
   JudgeModule, AwardsModule, LoggerModule,TokenModule,UtilityModule
  ],
  controllers: [AppController],
  providers: [AppService,
  {provide:APP_FILTER,
  useClass:LogExceptionFilter,}],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(SimpleMiddleware).
      forRoutes({
        path:'judge',
        method:RequestMethod.POST
      })
  }
  
}
