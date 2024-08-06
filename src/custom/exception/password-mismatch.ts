import { HttpException, HttpStatus } from '@nestjs/common';
export class PasswordMismatchException extends HttpException {
  constructor() {
    super('Password confirmation is not match', HttpStatus.BAD_REQUEST);
  }
}
