import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, { snapshot: true });
    const configService = app.get(ConfigService);
    // app.useGlobalGuards(new AuthGuard(), new RolesGuard());
    // 全局使用验证管道
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // 只允许 DTO 中定义的字段
        forbidNonWhitelisted: true, // 如果请求体包含未定义的字段，返回 400
      }),
    );

    app.enableCors({
      origin: '*', // 动态返回请求的 Origin，适合 Vercel
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type,Authorization',
    });

    await app.listen(configService.get<number>('port') || 3000);
    console.log(
      `Server is running on port ${configService.get<number>('port') || 3000}`,
    );
  } catch (error) {
    console.error('Error during application startup:', error);
    process.exit(1);
  }
}
bootstrap();
