import { BinanceApiService } from './../../binance-api/services/binance-api.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TradesService {
  public constructor(private readonly binanceApiService: BinanceApiService) {}
  public async getLatestAnalyzedCryptoData(): Promise<any> {
    const result = await this.binanceApiService.getTrades();
    return result;
  }
}
