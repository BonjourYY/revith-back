import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
  providers: [AppService],
})
export class AppModule {}
