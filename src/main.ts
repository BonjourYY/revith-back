import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, { snapshot: true });
    const configService = app.get(ConfigService);

    // 全局守卫
    // app.useGlobalGuards(new AuthGuard(), new RolesGuard());

    // 全局管道
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // 只允许 DTO 中定义的字段
        // forbidNonWhitelisted: true, // 如果请求体包含未定义的字段，返回 400
      }),
    );

    // CORS
    app.enableCors({
      origin: ['https://revith.cn'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Authorization',
      credentials: true, // 如果需要支持 cookie 或认证
    });

    // 版本控制
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

    // Swagger 文档
    const config = new DocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addTag('cats')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    await app.listen(configService.get<number>('database.port', 3000));

    console.log(
      `Server is running on port ${configService.get<number>('database.port', 3000)}`,
    );
  } catch (error) {
    console.error('Error during application startup:', error);
    process.exit(1);
  }
}

bootstrap();
