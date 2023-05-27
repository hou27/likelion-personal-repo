import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as redisStore from 'cache-manager-redis-store';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TWOHOUR } from './jwt/jwt.payload';
import { customJwtService } from './jwt/jwt.service';
import { JwtStrategy } from './jwt/jwt.strategy';

export const refreshTokenExpirationInCache = 60 * 60 * 24 * 30;
export const verifyEmailExpiration = 60 * 5;

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY,
        signOptions: { expiresIn: TWOHOUR },
      }),
    }),
    UsersModule,
    // CacheModule.registerAsync<RedisClientOptions>({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   // https://github.com/dabroek/node-cache-manager-redis-store/issues/40
    //   useFactory: async (configService: ConfigService) => ({
    //     store: redisStore as unknown as CacheStore,
    //     host: configService.get('REDIS_HOST'),
    //     port: configService.get('REDIS_PORT'),
    //   }),
    // }),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, customJwtService],
})
export class AuthModule {}
