import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: config.get<string>('CORS_ORIGINS')?.split(',') ?? ['http://localhost:3000'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('OMDC Dental API')
    .setDescription('Backend API for OMDC Dental clinic management system')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication & registration')
    .addTag('users', 'Patient accounts')
    .addTag('doctors', 'Doctor profiles & schedules')
    .addTag('services', 'Dental service catalog')
    .addTag('appointments', 'Booking & appointments')
    .addTag('queue', 'Real-time queue management')
    .addTag('transactions', 'OMDC transactions & codes')
    .addTag('payments', 'Payment processing')
    .addTag('notifications', 'Push notifications & broadcasts')
    .addTag('cms', 'Content management')
    .addTag('branches', 'Clinic branches')
    .addTag('reports', 'Analytics & reports')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = config.get<number>('PORT') ?? 3001;
  await app.listen(port);
  console.log(`OMDC Dental API running on http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/api/docs`);
}
bootstrap();
