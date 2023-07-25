import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(5000);
  app.enableCors({
    origin: [`http://localhost:3000`],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
}
bootstrap();
