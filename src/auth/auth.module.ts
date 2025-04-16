import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { SignatureModule } from 'src/signature/signature.module';

@Module({
  imports: [HttpModule, SignatureModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
