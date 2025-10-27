import { Controller, Get, Query } from '@nestjs/common';
import { TradesService } from '../../trades/services/trades.service';
import { GetTradesDto } from '../dto';
import { GetMaxMinTradesValuesOverTimeDto } from '../dto/get-max-min-trades-values-over-time.dto';

@Controller('trades/')
export class TradesController {
  public constructor(private readonly tradesService: TradesService) {}

  // curl "localhost:3000/trades?symbol=LTCBTC&limit=2"
  @Get()
  public async getTrades(
    @Query('symbol') symbol: string,
    @Query('limit') limit: number,
  ): Promise<GetTradesDto> {
    const trades = await this.tradesService.getTrades(symbol, limit);
    return { data: trades };
  }

  // this is endpoint to demonstrate simple data analysis on trades data
  // curl "localhost:3000/trades/getMaxMinTradesValuesOverTime?symbol=LTCBTC&limit=2"
  @Get('getMaxMinTradesValuesOverTime')
  public async getMaxMinTradesValuesOverTime(
    @Query('symbol') symbol: string,
    @Query('limit') limit: number,
  ): Promise<GetMaxMinTradesValuesOverTimeDto> {
    const { maxPriceTrade, minPriceTrade } =
      await this.tradesService.getMaxMinTradesValuesOverTime(symbol, limit);

    return {
      data: {
        maxTrade: maxPriceTrade,
        minTrade: minPriceTrade,
      },
    };
  }
}
