import { BinanceApiService } from './../../binance-api/services/binance-api.service';
import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger.service';

export class Trade {
  id: number;
  isBestMatch: boolean;
  isBuyerMaker: boolean;
  price: number;
  qty: number;
  quoteQty: number;
  time: number;
}

@Injectable()
export class TradesService {
  public constructor(
    private readonly binanceApiService: BinanceApiService,
    private readonly logger: LoggerService,
  ) {}

  public async getTrades(symbol: string, limit?: number): Promise<Trade[]> {
    try {
      const result = await this.binanceApiService.getTrades({
        symbol,
        limit,
      });
      return result;
    } catch (error) {
      this.logger.error('Could not get latest trades.', error.message);
      // either return default empty value or throw dedicated API error code
      return [];
    }
  }

  public async getMaxMinTradesValuesOverTime(
    symbol: string,
    limit?: number,
  ): Promise<{
    minPriceTrade: Trade;
    maxPriceTrade: Trade;
  }> {
    // same thing here, add try & catch + log error
    const trades = await this.getTrades(symbol, limit);

    const minPriceTrade = trades.sort((a: Trade, b: Trade) => {
      if (a.price > b.price) {
        return -1;
      } else if (a.price < b.price) {
        return 1;
      }

      return 0;
    });

    const maxPriceTrade = trades.sort((a: Trade, b: Trade) => {
      if (a.price > b.price) {
        return 1;
      } else if (a.price < b.price) {
        return -1;
      }

      return 0;
    });

    return {
      maxPriceTrade: maxPriceTrade[0],
      minPriceTrade: minPriceTrade[0],
    };
  }
}
