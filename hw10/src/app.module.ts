import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UploadModule.forRoot({
      accesskey: process.env.AWS_ACCESS_KEY,
      secretkey: process.env.AWS_SECRET_KEY,
      bucketname: process.env.AWS_BUCKET_NAME,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
