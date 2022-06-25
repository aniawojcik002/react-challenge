// noinspection JSIgnoredPromiseFromCall

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // Swagger Api
  const options = new DocumentBuilder()
    .setTitle('Dare IT - Wyzwanie Programowanie')
    .setDescription(
      'API zasilające frontendowe wyzwanie DareIT. Każda z opisanych poniżej operacji będzie edytować dane przechowywane w pamięci serwera.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document);

  app.enableCors();

  await app.listen(4320);
}

bootstrap();
