import { Module } from '@nestjs/common';
import { BinanceApiService } from './binanace-api.service';

@Module({
  providers: [BinanceApiService],
  exports: [BinanceApiService],
})
export class BinanceApiModule {}
