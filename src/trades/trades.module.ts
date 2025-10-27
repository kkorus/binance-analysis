import { Module } from '@nestjs/common';
import { TradesService } from './services/trades.service';
import { BinanceApiModule } from '../binance-api/binance-api.module';
import { LoggerService } from './services/logger.service';

@Module({
  imports: [BinanceApiModule],
  providers: [TradesService, LoggerService],
  exports: [TradesService],
})
export class TradesModule {}
