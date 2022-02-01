import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExceptionLogEntity } from './entites/exception-log';

@Injectable()
export class LoggerService {
    constructor(
    @InjectRepository(ExceptionLogEntity)
    private readonly exceptionLogRepository: Repository<ExceptionLogEntity>) {}

  insertLog(statusCode: number, message: string) {
    const log = this.exceptionLogRepository.create({
      error: message,
      statusCode,
      createdAt: new Date(),
    });

    return this.exceptionLogRepository.save(log);

}}
