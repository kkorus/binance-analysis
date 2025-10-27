import { LoggerService } from './logger.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BinanceApiService, GetTradesResponse } from '../../binance-api';
import { TradesService } from './trades.service';
import {
  instance,
  mock,
  when,
  deepEqual,
  verify,
  anything,
} from '@johanblumenberg/ts-mockito';

describe('TradesService', () => {
  let sut: TradesService;
  let binanceApiService: BinanceApiService;
  let loggerService: LoggerService;
  let module: TestingModule;

  beforeEach(async () => {
    binanceApiService = mock(BinanceApiService);
    loggerService = mock(LoggerService);

    module = await Test.createTestingModule({
      providers: [
        TradesService,
        {
          provide: BinanceApiService,
          useValue: instance(binanceApiService),
        },
        {
          provide: LoggerService,
          useValue: instance(loggerService),
        },
      ],
    }).compile();

    sut = module.get<TradesService>(TradesService);
  });

  it('service should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('getTrades', () => {
    it('should return trades data', async () => {
      // given
      const symbol = 'TEST_SYMBOL';
      const limit = 1;
      const tradesResponse: GetTradesResponse[] = [
        {
          id: 106103763,
          isBestMatch: true,
          isBuyerMaker: false,
          price: 0.000861,
          qty: 3.177,
          quoteQty: 0.00273539,
          time: 1761575115157,
        },
      ];
      when(
        binanceApiService.getTrades(deepEqual({ symbol, limit })),
      ).thenResolve(tradesResponse);

      // when
      const trades = await sut.getTrades(symbol, limit);

      // then
      expect(trades.length).toBe(1);
      expect(trades[0]).toEqual(tradesResponse[0]);
    });

    it('should log error when getting trades fail', async () => {
      // given
      const symbol = 'TEST_SYMBOL';
      const limit = 1;
      when(
        binanceApiService.getTrades(deepEqual({ symbol, limit })),
      ).thenReject(new Error('Invalid symbol provided!'));

      // when
      const trades = await sut.getTrades(symbol, limit);

      // then
      expect(trades.length).toBe(0);
      verify(loggerService.error(anything(), anything())).once();
    });
  });
});
