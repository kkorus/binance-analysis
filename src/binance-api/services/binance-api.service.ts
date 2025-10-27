import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface GetTradesParams {
  symbol: string;
  limit?: number;
}
export interface GetTradesResponse {
  id: number;
  isBestMatch: boolean;
  isBuyerMaker: boolean;
  price: number;
  qty: number;
  quoteQty: number;
  time: number;
}

@Injectable()
export class BinanceApiService {
  // TODO: could be move to some config file like .env
  // * I'm leaving it here for demo purpose
  private readonly BASE_URL = 'https://api.binance.com';

  public async getTrades(
    params: GetTradesParams,
  ): Promise<GetTradesResponse[]> {
    const { symbol, limit } = params;
    const url = '/api/v3/trades';
    const defaultLimit = 500;

    const response = await axios.get(`${this.BASE_URL}${url}`, {
      params: {
        symbol,
        limit: limit ?? defaultLimit,
      },
    });

    return response.data;
  }
}
