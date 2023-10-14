import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable swagger json page redirection
  const appService = app.get(AppService);
  appService.setApp(app);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('back')
    .setDescription('Backend from clinic dashboard')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      // Set url and port to swagger
      url: `http://localhost:4201/api-docs`,
    },
  });

  await app.listen(4201);
}

bootstrap();
