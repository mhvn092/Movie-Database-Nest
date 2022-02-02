import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly tokenservice: TokenService,
    private readonly reflector: Reflector){}
  
    async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest<Request>();
    let token;
    if (request.headers['token']) {
      token = request.headers['token'];
    } else {
      throw new BadRequestException(`no token, no entry man`);
    }

    const check = await this.tokenservice.find(token);
    console.log('after query',check);
    if (!check) {
      return false;
    }
    return true;
  }
}
