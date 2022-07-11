import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BooksModule } from './modules/books/books.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BookCommentModule } from './modules/book-comment/book-comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('DB_HOST') ?? 'mongodb://localhost:27017',
        user: configService.get<string>('DB_USERNAME') ?? 'root',
        pass: configService.get<string>('DB_PASSWORD') ?? 'password',
        dbName: configService.get<string>('DB_NAME') ?? 'library_database',
      }),
      inject: [ConfigService],
    }),
    BooksModule,
    AuthModule,
    UsersModule,
    BookCommentModule,
  ],
})
export class AppModule {}
