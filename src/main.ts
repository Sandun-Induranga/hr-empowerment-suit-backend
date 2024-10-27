import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  app.use(json({ limit: '50mb' }));

  const options = new DocumentBuilder()
    .setTitle('HR EMPOWERMENT API')
    .setDescription('The HR EMPOWERMENT API endpoints')
    .setVersion('1.0')
    .addTag('hr-empowerment')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}

bootstrap().then((r) => console.log('Server is running on port 3000'));
