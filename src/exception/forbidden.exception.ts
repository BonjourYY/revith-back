import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden1111', HttpStatus.FORBIDDEN);
  }
}
