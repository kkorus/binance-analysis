import { Controller } from '@nestjs/common';

@Controller()
export class TradesController {
  public constructor() {}

  public getTrades(): Promise<void> {
    return Promise.resolve();
  }
}
