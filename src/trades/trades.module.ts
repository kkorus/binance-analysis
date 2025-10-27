import { Module } from '@nestjs/common';
import { TradesService } from './services/trades.service';
import { BinanceApiModule } from '../binance-api/binance-api.module';

@Module({
  imports: [BinanceApiModule],
  providers: [TradesService],
  exports: [TradesService],
})
export class TradesModule {}
