import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'reflect-metadata';
// import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  const port = +process.env.APP_PORT || 4010;
  console.log('Port running on: ', port);

  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('Leasing')
    .setDescription('The laesing API description')
    .setVersion('1.0')
    .addTag('leasing')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();

  // app.use(bodyParser.json());
  // app.use(bodyParser.json({ limit: '1mb' }));
  // app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
  // app.use(bodyParser.text({ type: 'text/html' }));
  await app.listen(port);
}
bootstrap();
