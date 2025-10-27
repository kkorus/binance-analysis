import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  public error(message: string, error: string): void {
    console.log(message, error);
  }
}
