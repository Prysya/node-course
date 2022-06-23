import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  ],
})
export class AppModule {}
