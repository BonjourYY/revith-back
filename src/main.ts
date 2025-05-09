import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
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
        // forbidNonWhitelisted: true, // 如果请求体包含未定义的字段，返回 400
      }),
    );

    // 启用 CORS 并指定允许的域名
    app.enableCors({
      origin: ['https://revith.cn'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Authorization',
      credentials: true, // 如果需要支持 cookie 或认证
    });

    // 启用版本控制
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

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
