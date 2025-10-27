import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface TradesResponse {}

@Injectable()
export class BinanceApiService {
  public async getTrades(): Promise<TradesResponse> {
    const baseUrl = 'https://api.binance.com';
    const url = '/api/v3/trades';

    const response = await axios.get(`${baseUrl}${url}`, {
      params: {
        symbol: 'LTCBTC',
        limit: 1,
      },
    });

    return response;
  }
}
