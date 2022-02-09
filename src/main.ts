import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }, }),
      );
      const options = new DocumentBuilder()
      .setTitle('Our Api Specification')
      .setVersion('1.0.0')
      .setDescription('Our Api Description')
      .addBearerAuth()
      .build();
  
    const document = SwaggerModule.createDocument(app, options);
  
    SwaggerModule.setup('/docs', app, document);
    
  await app.listen(3000,()=>{console.log('Server Up AND Running')});
}
bootstrap();
