import { registerAs } from '@nestjs/config';

// test라는 토큰으로 config factory를 등록
export default registerAs('test', () => ({
  auth: {
    env: process.env.AUTH_ENV,
  },
  db: {
    env: process.env.DB_ENV,
  },
}));
