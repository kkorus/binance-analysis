import { TradeDto } from './trade.dto';

export class GetMaxMinTradesValuesOverTimeDto {
  public data: {
    minTrade: TradeDto;
    maxTrade: TradeDto;
  };
}
