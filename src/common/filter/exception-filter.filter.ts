import { ArgumentsHost, Catch, ExceptionFilter, HttpException, } from '@nestjs/common';
import { LoggerService } from '../../logger/logger.service';
import { Response } from 'express';

@Catch(HttpException)
export class LogExceptionFilter implements ExceptionFilter {
  constructor(private LoggerService: LoggerService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const error = exception.getResponse();
    let myResponse;
    if (typeof error === 'string') {
      myResponse = { message: error };
    } else {
      myResponse = error as object;
    }

    const log = await this.LoggerService.insertLog(
      exception.getStatus(),
      myResponse.message,
    );

    response.status(exception.getStatus()).json({
      ...myResponse,
      logId: log.id,
    });
  }
}
