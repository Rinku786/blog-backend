import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  let envFile;
  switch (process.env.NODE_ENV) {
    case 'production':
      envFile = '.env.production';
      break;
    case 'development':
      envFile = '.env.development';
      break;
    case 'qa':
      envFile = '.env.qa';
      break;
    default:
      envFile = '.env';
  }
  dotenv.config({ path: envFile });

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('JK Tech Blog')
    .setDescription('The jktech API description')
    .setVersion('1.0')
    .addTag('Blogs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
