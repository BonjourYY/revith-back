import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { SignatureValidatorService } from './signature.service';

@Controller('signature')
export class SignatureController {
  constructor(private readonly signatureValidator: SignatureValidatorService) {}

  /**
   * Generates a signature for the provided data.
   * @param body - Data to sign.
   * @returns Generated signature and the raw signature string.
   */
  @Post('generate')
  @HttpCode(HttpStatus.OK)
  generateSignature(@Body() body: Record<string, any>) {
    const signature = this.signatureValidator.generateSignature(body);
    const signatureStr = this.signatureValidator.getSignatureStr();
    return {
      signature,
      signatureStr,
      message: 'Signature generated successfully',
    };
  }

  /**
   * Verifies a signature against the provided data.
   * @param body - Data containing the signature and other fields.
   * @returns Whether the signature is valid.
   */
  @Post('verify')
  @HttpCode(HttpStatus.OK)
  verifySignature(@Body() body: Record<string, any>) {
    const signature = body.signature ?? '';
    const isValid = this.signatureValidator.verifySignature(body, signature);
    return {
      valid: isValid,
      message: isValid ? 'Signature is valid' : 'Signature is invalid',
      debug: {
        inputSignature: signature,
        signatureStr: this.signatureValidator.getSignatureStr(), // Include raw string
      },
    };
  }
}
