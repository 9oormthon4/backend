import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common' 
import { HttpExceptionFilter } from './error/filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.useGlobalFilters(
    HttpExceptionFilter(false)
  );


  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  
  app.enableCors({
    methods: 'GET, PATCH, POST',
    origin: ["https://adregamdy.vercel.app", "http://localhost:3000", "*/*"],
    credentials: true,
    allowedHeaders: '*'
  });

  const config = new DocumentBuilder()
    .setTitle('Adregamdy example')
    .setDescription('The Adregamdy API description')
    .setVersion('1.0')
    .addTag('Adregamdy')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
