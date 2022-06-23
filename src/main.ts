import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('PORT') ?? 3000;

  await app.listen(PORT);
  console.log(`Приложение запущено на: ${await app.getUrl()}`);
})()
