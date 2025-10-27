import { Module } from '@nestjs/common';
import { TradesController } from './controllers';
import { TradesModule } from '../trades/trades.module';

@Module({
  imports: [TradesModule],
  controllers: [TradesController],
})
export class ApiModule {}
