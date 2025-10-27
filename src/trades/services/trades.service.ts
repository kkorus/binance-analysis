import { BinanceApiService } from './../../binance-api/services/binance-api.service';
import { Injectable } from '@nestjs/common';

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
  public constructor(private readonly binanceApiService: BinanceApiService) {}

  public async getTrades(symbol: string, limit?: number): Promise<Trade[]> {
    const result = await this.binanceApiService.getTrades({
      symbol,
      limit,
    });
    return result;
  }

  public async getMaxMinTradesValuesOverTime(
    symbol: string,
    limit?: number,
  ): Promise<{
    minPriceTrade: Trade;
    maxPriceTrade: Trade;
  }> {
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
