import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { MailModule } from './mail/mail.module';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [emailConfig],
      validationSchema,
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
