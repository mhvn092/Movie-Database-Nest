import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class SimpleInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(`Simple Interceptor`);
    return next.handle().pipe(
       map(element => {
        return {judges:{...element}}
      })
    );}
}
