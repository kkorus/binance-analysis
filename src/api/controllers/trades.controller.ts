import { Controller, Get, Query } from '@nestjs/common';
import { TradesService } from '../../trades/services/trades.service';
import { GetTradesDto } from '../dto';

@Controller('trades/')
export class TradesController {
  public constructor(private readonly tradesService: TradesService) {}

  // curl "localhost:3000/trades?symbol=LTCBTC&limit=2"
  @Get()
  public async getTrades(
    @Query('symbol') symbol: string,
    @Query('limit') limit: number,
  ): Promise<GetTradesDto> {
    const trades = await this.tradesService.getLatestTrades(symbol, limit);
    return { data: trades };
  }
}
