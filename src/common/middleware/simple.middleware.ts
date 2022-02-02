import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('simple middleware, no creative idea about it'),
    console.log(req.protocol)
    res.on('close',()=>{
      console.log('uhoh you messed up with the wrong dudes my man');
    })
    next();
  }
}
