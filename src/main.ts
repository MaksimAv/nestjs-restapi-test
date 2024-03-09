import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 5001;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const document = new DocumentBuilder()
    .setTitle('Event App')
    .setDescription('Event App Docs')
    .setVersion('0.1')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, document);
  SwaggerModule.setup('/docs', app, swaggerDocument);

  await app.listen(PORT, () => Logger.log(`Server start on port: ${PORT}`));
}
bootstrap();
