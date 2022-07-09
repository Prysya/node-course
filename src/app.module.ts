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
        uri: configService.get<string>('NODE_ENV') === 'test'
          ? configService.get<string>('DB_TEST_HOST')
          : configService.get<string>('DB_HOST'),
        user: configService.get<string>('DB_USERNAME'),
        pass: configService.get<string>('DB_PASSWORD'),
        dbName: configService.get<string>('DB_NAME'),
      }),
      inject: [ConfigService],
    }),
    BooksModule,
  ],
})
export class AppModule {}
