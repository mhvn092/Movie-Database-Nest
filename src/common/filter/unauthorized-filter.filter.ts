import { ArgumentsHost, Catch, ExceptionFilter, UnauthorizedException } from '@nestjs/common';
import { LoggerService } from '../../logger/logger.service';
import { Response } from 'express';

@Catch(UnauthorizedException)
export class UnauthorizedFilter implements ExceptionFilter {
  constructor(private loggerService: LoggerService) {}
  async catch(exception: UnauthorizedException, host: ArgumentsHost) {

    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const error = exception.getResponse();
    let myResponse;
    if (typeof error === 'string') {
      myResponse = { message: error };
    } else {
      myResponse = error as object;
    }
    const log = await this.loggerService.insertLog(
      exception.getStatus(),
      myResponse.message,
    );

    response.status(exception.getStatus()).json({
      ...myResponse,
      logId: log.id,
    });

    response.redirect('./login',301);
  }
}
