import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionLogEntity } from './entites/exception-log';

@Module({
  imports:[TypeOrmModule.forFeature([ExceptionLogEntity])],
  providers: [LoggerService],
  exports:[LoggerService]
})
export class LoggerModule {}
