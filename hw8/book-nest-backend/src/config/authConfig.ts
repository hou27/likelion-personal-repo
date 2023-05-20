import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecretKey: process.env.JWT_SECRET_KEY,
}));
