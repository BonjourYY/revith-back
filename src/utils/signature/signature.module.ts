import { Module } from '@nestjs/common';
import { SignatureValidatorService } from './signature.service';
import { SignatureController } from './signature.controller';

@Module({
  controllers: [SignatureController],
  providers: [SignatureValidatorService],
  exports: [SignatureValidatorService],
})
export class SignatureModule {}
