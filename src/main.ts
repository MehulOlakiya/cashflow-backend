import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Lightweight endpoint for uptime checks and deployment health probes.
  app
    .getHttpAdapter()
    .get('/health', (_request: Request, response: Response) => {
      response.status(200).json({
        status: 'ok',
        service: 'cashflow-backend',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      });
    });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server running on port ${port}`);
}

bootstrap();
