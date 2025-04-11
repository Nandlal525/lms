import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MembersModule,
    UsersModule,
    TransactionsModule,
    BooksModule,
    AuthModule,MailerModule.forRoot({
    transport:{
      host:process.env.SMTP_HOST,
      port:process.env.SMTP_PASSWORD,
      auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASSWORD,
      },
    },
    template:{
      dir:join(__dirname,'templates'),
      adapter: new HandlebarsAdapter()
    }
  }),
  BullModule.forRoot({
    redis:{
      host:process.env.REDIS_HOST!,
      port:parseInt(process.env.REDIS_PORT!),
    },
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
