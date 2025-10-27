import { Module } from '@nestjs/common';
import { BinanceApiService } from './services';

@Module({
  providers: [BinanceApiService],
  exports: [BinanceApiService],
})
export class BinanceApiModule {}
