import { MiddlewareConsumer, Module, NestModule, RequestMethod, ValidationPipe } from '@nestjs/common';
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
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { LogExceptionFilter } from '../common/filter/exception-filter.filter';
import appconfig from './config/appconfig';
import { SimpleMiddleware } from '../common/middleware/simple.middleware';
import { UtilityModule } from '../utility/utility.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appconfig],
      }),
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule.forFeature(appconfig)],
        useFactory: (app: ConfigType<typeof appconfig>) => {
          return {
            type: 'postgres',
            ...app.database,
            extra: {
              trustServerCertificate: true,
            },
            synchronize: true,
            autoLoadEntities: true,
          };
        },
        inject: [appconfig.KEY],
  }),ActorModule, MovieModule, DirectorModule, GenreModule,
   JudgeModule, AwardsModule, LoggerModule,UtilityModule,
  ],
  controllers: [AppController],
  providers: [AppService,
  {provide:APP_FILTER,
  useClass:LogExceptionFilter,}
  ,{
    provide:APP_PIPE,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return new ValidationPipe({
      whitelist: configService.get<boolean>('VALIDATION_WHITE_LIST'),
      forbidNonWhitelisted: configService.get<boolean>(
      'FORBIDDEN_NON_WHITE_LISTED'),
      })}}],
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
