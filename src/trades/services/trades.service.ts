import { BinanceApiService } from './../../binance-api/services/binance-api.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TradesService {
  public constructor(private readonly binanceApiService: BinanceApiService) {}

  public async getLatestTrades(symbol: string, limit?: number): Promise<any> {
    const result = await this.binanceApiService.getTrades({
      symbol,
      limit,
    });
    return result;
  }
}
