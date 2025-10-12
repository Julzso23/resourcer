import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
