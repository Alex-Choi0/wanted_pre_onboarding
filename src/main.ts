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
    .setTitle('프리온보딩 백엔드 코스 4차 선발과제 API문서')
    .setVersion('1.0')
    .setDescription(`
    Blog : https://engineeringshw.blogspot.com/
    GitHub : https://github.com/Alex-Choi0
    숏에세이 : https://blog.naver.com/unrealjason/222854114037
    `)
    .build();

  // Swagger Document의 문서를 api(/api-docs)로 설정할수 있게 셋팅
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.NESTJS_PORT);
  console.log('SERVER PORT : ', process.env.NESTJS_PORT);
}
bootstrap();
