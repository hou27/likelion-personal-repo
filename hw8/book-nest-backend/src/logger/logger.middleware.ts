import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    // res.send('DONE'); // 이 라인 활성화하고 next() 주석처리하면 미들웨어에서 응답을 보내고 라우터로 넘어가지 않음
    next();
  }
}
