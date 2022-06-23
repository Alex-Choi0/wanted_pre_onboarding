import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Playin_RPG_SoketIO')
    .setVersion('1.0')
    .addTag(
      '소켓IO테스트를 위한 서버',
      '간단한 소켓IO테스트 서버입니다. 향후 Playin_RPG의 데이터를 받을수 있는지 확인하기 위한 테스트 서버 입니다.',
    )
    .addBearerAuth()
    .build();

  // Swagger Document의 문서를 api(/api-docs)로 설정할수 있게 셋팅
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.NESTJS_PORT);
  console.log('SERVER PORT : ', process.env.NESTJS_PORT);
}
bootstrap();
