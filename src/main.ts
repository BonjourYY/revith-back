import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, { snapshot: true });
    // app.useGlobalGuards(new AuthGuard(), new RolesGuard());
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.PORT || 3000);
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  } catch (error) {
    console.error('Error during application startup:', error);
    process.exit(1);
  }
}
bootstrap();
