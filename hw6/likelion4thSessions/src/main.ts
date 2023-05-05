// main.ts 파일은 해당 프로젝트 파일의 root 파일이라고 할 수 있다.

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //localhost:3000에서 해당 서버를 실행
  await app.listen(3000);
}
bootstrap();
