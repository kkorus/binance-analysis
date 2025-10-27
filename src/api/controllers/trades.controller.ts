import { Controller, Get } from '@nestjs/common';
import { TradesService } from '../../trades/services/trades.service';

@Controller('trades/')
export class TradesController {
  public constructor(private readonly tradesService: TradesService) {}

  @Get()
  public getTrades(): Promise<void> {
    return this.tradesService.getLatestAnalyzedCryptoData();
  }
}
