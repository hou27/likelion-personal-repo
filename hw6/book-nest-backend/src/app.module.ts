import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env' : 'none',
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
